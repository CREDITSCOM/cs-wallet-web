(function () {
    function CreateTransaction(Obj) {
        let DefObj = {
            _connect: Connect(),
            Source: "",
            Target: "",
            PrivateKey: "",
            Amount: "0.0",
            Fee: "0.9",
            SmartContract: undefined,
            TransactionObj: undefined,
            UserData: undefined
        };

        let DefSmart = {
            Params: undefined,
            Method: undefined,
            Сode: undefined,
            NewState: false
        };

        /*
            Params = [
                {K: "STRING",V: "Valuw"}
            ] 

            List approved keys:
            STRING
        */

        let ResObj = {
            Message: null,
            Result: null
        };

        for (let i in DefObj) {
            if (Obj[i] === undefined) {
                Obj[i] = DefObj[i];
            }
        }

        if (Obj.SmartContract !== undefined) {
            for (let i in DefSmart) {
                if (Obj.SmartContract[i] === undefined) {
                    Obj.SmartContract[i] = DefSmart[i];
                }
            }
        }

        Obj.Amount = String(Obj.Amount).replace(',', '.');
        Obj.Fee = String(Obj.Fee).replace(',', '.');

        let Trans;

        if (Obj.TransactionObj === undefined) {
            Trans = new Transaction();
        }
        else {
            Trans = Obj.TransactionObj;
        }

        let Source = CheckStrTransaction(Obj.Source, "Source");
        if (Source.R === undefined) {
            ResObj.Message = Source.M;
            return ResObj;
        }
        else {
            Trans.source = Source.R;
        }

        let Private = CheckStrTransaction(Obj.PrivateKey, "Private");
        if (Private.R === undefined) {
            ResObj.Message = Private.M;
            return ResObj;
        }
        else {
            Private = Private.R;
        }

        let TRes = Obj._connect.WalletTransactionsCountGet(Trans.source);
        if (TRes.status.code === 0) {
            Trans.id = TRes.lastTransactionInnerId + 1;
        }
        else {
            ResObj.Message = TRes.status.message;
            return ResObj;
        }

        if (Obj.SmartContract !== undefined && Obj.SmartContract.Code !== undefined) {
            let Target = Trans.source;
            Target = concatTypedArrays(Target, NumbToByte(Trans.id, 6));
            let ByteCode = Obj._connect.SmartContractCompile(Obj.SmartContract.Code);
            if (ByteCode.status.code === 0) {
                for (let i in ByteCode.byteCodeObjects) {
                    Target = concatTypedArrays(Target, ConvertCharToByte(ByteCode.byteCodeObjects[i].byteCode));
                }
            }
            else {
                ResObj.Message = ByteCode.status.message;
                return ResObj;
            }

            Trans.target = blake2s(Target);
        }
        else {
            let Target = CheckStrTransaction(Obj.Target, "Target");
            if (Target.R === undefined) {
                ResObj.Message = Target.M;
                return ResObj;
            }
            else {
                Trans.target = Target.R;
            }
        }

        Trans.amount = new Amount({
            integral: Math.trunc(Obj.Amount),
            fraction: 0
        });
        if (Obj.Amount.split(".").length > 1) {
            Trans.amount.fraction = Number("0." + Obj.Amount.split(".")[1]) * Math.pow(10, 18);
        }

        let F = Fee(Obj.Fee);
        let FE = NumbToBits(F.exp);
        while (FE.length < 5) {
            FE = "0" + FE;
        }
        let FM = NumbToBits(F.man);
        while (FM.length < 10) {
            FM = "0" + FM;
        }

        Trans.fee = new AmountCommission({
            commission: BitsToNumb("0" + FE + FM)
        });

        Trans.currency = 1;

        let PerStr = NumbToByte(Trans.id, 6);
        PerStr = concatTypedArrays(PerStr, Trans.source);
        PerStr = concatTypedArrays(PerStr, Trans.target);
        PerStr = concatTypedArrays(PerStr, NumbToByte(Trans.amount.integral, 4));
        PerStr = concatTypedArrays(PerStr, NumbToByte(Trans.amount.fraction, 8));
        PerStr = concatTypedArrays(PerStr, NumbToByte(Trans.fee.commission, 2));
        PerStr = concatTypedArrays(PerStr, new Uint8Array([1]));

        if (Obj.SmartContract === undefined && Obj.UserData === undefined) {
            PerStr = concatTypedArrays(PerStr, new Uint8Array(1));
        }
        else if (Obj.SmartContract !== undefined) {
            PerStr = concatTypedArrays(PerStr, new Uint8Array([1]));

            let UserField = new Uint8Array();

            Trans.smartContract = new SmartContractInvocation();

            UserField = concatTypedArrays(UserField, new Uint8Array([11, 0, 1]));
            if (Obj.SmartContract.Method === undefined) {
                UserField = concatTypedArrays(UserField, new Uint8Array(4));
            }
            else {
                Trans.smartContract.method = Obj.SmartContract.Method;
                UserField = concatTypedArrays(UserField, NumbToByte(Obj.SmartContract.Method.length, 4).reverse());
                UserField = concatTypedArrays(UserField, ConvertCharToByte(Obj.SmartContract.Method));
            }

            UserField = concatTypedArrays(UserField, new Uint8Array([15, 0, 2, 12]));
            if (Obj.SmartContract.Params === undefined) {
                UserField = concatTypedArrays(UserField, new Uint8Array(4));
            }
            else {
                Trans.smartContract.params = [];
                UserField = concatTypedArrays(UserField, NumbToByte(Obj.SmartContract.Params.length, 4).reverse());
                for (let i in Obj.SmartContract.Params) {
                    let val = Obj.SmartContract.Params[i];

                    switch (val.K) {
                        case "STRING":
                            UserField = concatTypedArrays(UserField, new Uint8Array([11, 0, 17]));
                            UserField = concatTypedArrays(UserField, NumbToByte(val.V.length, 4).reverse());
                            UserField = concatTypedArrays(UserField, ConvertCharToByte(val.V));
                            Trans.smartContract.params.push(new Variant({ v_string: val.V }));
                            UserField = concatTypedArrays(UserField, new Uint8Array(1));
                            break;
                        case "INT":
                            UserField = concatTypedArrays(UserField, new Uint8Array([8, 0, 9]));
                            UserField = concatTypedArrays(UserField, NumbToByte(val.V, 4).reverse());
                            Trans.smartContract.params.push(new Variant({ v_int: val.V }));
                            UserField = concatTypedArrays(UserField, new Uint8Array(1));
                            break;
                        case "BOOL":
                            UserField = concatTypedArrays(UserField, new Uint8Array([2, 0, 3]));
                            UserField = concatTypedArrays(UserField, new Uint8Array(1));
                            if (val.V) {
                                UserField[UserField.length - 1] = 1;
                            }
                            Trans.smartContract.params.push(new Variant({ v_boolean: val.V }));
                            UserField = concatTypedArrays(UserField, new Uint8Array(1));
                            break;
                    }
                }
            }

            UserField = concatTypedArrays(UserField, new Uint8Array([15, 0, 3, 11, 0, 0, 0, 0]));

            Trans.smartContract.forgetNewState = Obj.SmartContract.NewState;
            UserField = concatTypedArrays(UserField, new Uint8Array([2, 0, 4, 0]));
            if (Obj.SmartContract.NewState) {
                UserField[UserField.length - 1] = 1;
            }

            if (Obj.SmartContract.Code !== undefined) {
                UserField = concatTypedArrays(UserField, new Uint8Array([12, 0, 5, 11, 0, 1]));

                Trans.smartContract.smartContractDeploy = new SmartContractDeploy({
                    sourceCode: Obj.SmartContract.Code
                });

                UserField = concatTypedArrays(UserField, NumbToByte(Obj.SmartContract.Code.length, 4).reverse());
                UserField = concatTypedArrays(UserField, ConvertCharToByte(Obj.SmartContract.Code));

                UserField = concatTypedArrays(UserField, new Uint8Array([15, 0, 2, 12]));
                let ByteCode = Obj._connect.SmartContractCompile(Obj.SmartContract.Code);


                if (ByteCode.status.code === 0) {
                    Trans.smartContract.smartContractDeploy.byteCodeObjects = [];
                    UserField = concatTypedArrays(UserField, NumbToByte(ByteCode.byteCodeObjects.length, 4).reverse());

                    for (let i in ByteCode.byteCodeObjects) {


                        let val = ByteCode.byteCodeObjects[i];
                        UserField = concatTypedArrays(UserField, new Uint8Array([11, 0, 1]));
                        UserField = concatTypedArrays(UserField, NumbToByte(val.name.length, 4).reverse());
                        UserField = concatTypedArrays(UserField, ConvertCharToByte(val.name));

                        UserField = concatTypedArrays(UserField, new Uint8Array([11, 0, 2]));
                        UserField = concatTypedArrays(UserField, NumbToByte(val.byteCode.length, 4).reverse());
                        UserField = concatTypedArrays(UserField, ConvertCharToByte(val.byteCode));
                        Trans.smartContract.smartContractDeploy.byteCodeObjects.push(new ByteCodeObject({
                            name: val.name,
                            byteCode: val.byteCode
                        }));
                        UserField = concatTypedArrays(UserField, new Uint8Array(1));
                    }
                }
                else {
                    ResObj.Message = ByteCode.Status.Message;
                    return ResObj;
                }

                UserField = concatTypedArrays(UserField, new Uint8Array([11, 0, 3, 0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0]));
            }

            UserField = concatTypedArrays(UserField, new Uint8Array(1));
            PerStr = concatTypedArrays(PerStr, NumbToByte(UserField.length, 4));
            PerStr = concatTypedArrays(PerStr, UserField);
        }
        else if (Obj.UserData !== undefined)
        {
            let UserField = concatTypedArrays(new Uint8Array([1]), NumbToByte(Obj.UserData.length,4));
            UserField = concatTypedArrays(UserField, ConvertCharToByte(Obj.UserData));
            PerStr = concatTypedArrays(PerStr, UserField);
            Trans.userFields = ConvertCharToByte(Obj.UserData);
        }



        var ArHex = "0123456789ABCDEF";
        var Hex = "";
        for (let j = 0; j < PerStr.length; j++) {
            Hex += ArHex[Math.floor(PerStr[j] / 16)];
            Hex += ArHex[Math.floor(PerStr[j] % 16)];
        }
        console.log(Hex);

        Trans.signature = nacl.sign.detached(PerStr, Private);
        console.log(Trans);
        ResObj.Result = Trans;
        return ResObj;
    }

    function ConvertCharToByte(Str) {
        let B = new Uint8Array(Str.length);
        for (let i in Str) {
            B[i] = Str[i].charCodeAt();
        }
        return B;
    }

    function CheckStrTransaction(Field, FieldName) {
        let Res = {
            M: "",
            R: undefined
        };

        if (Field === "") {
            Res.M = `${FieldName} is not found`;
            return Res;
        }
        else {
            if (typeof Field === "string") {
                try {
                    Res.R = Base58.decode(Field);
                } catch (e) {
                    Res.M = `${FieldName} is not valid`;
                }
            }
            else {
                Res.R = Field;
            }
        }
        return Res;
    }

    function NumbToBits(int) {
        let Bits = "";

        let numb = String(int);
        while (true) {
            Bits = (numb % 2) + Bits;
            numb = Math.floor(numb / 2);

            if (numb <= 1) {
                Bits = numb + Bits;
                break;
            }
        }

        return Bits;
    }

    function BitsToByts(Bits) {
        let Lng = 0;
        if (Bits.length % 8 === 0) {
            Lng = Math.floor(Bits.length / 8);
        } else {
            Lng = Math.floor(Bits.length / 8) + 1;
        }

        let Byts = new Uint8Array(Lng);
        let Stage = 1;
        let i = Bits.length - 1;
        while (true) {
            if (Math.floor(((i + 1) % 8)) === 0) {
                Stage = 1;
            }
            Byts[Math.floor(i / 8)] += Stage * Bits[i];
            Stage *= 2;
            if (i === 0) {
                break;
            }
            i -=1;
        }

        return Byts;
    }

    function BitsToNumb(Bits) {
        let numb = 0;
        let mnoj = 1;
        for (var i = Bits.length-1; i > 0; i -= 1) {
            if (Bits[i] !== 0) { 
                numb += mnoj * Bits[i];
            }
            mnoj *= 2;
        }
        return numb;
    }

    function GetBitArray(n, i) {
        var Ar = new Uint8Array(i);
        for (var index in Ar) {
            Ar[index] = index > 0 ? (n >> index * 8) & 0xFF : n & 0xFF;
        }
        return Ar;
    }

    function concatTypedArrays(a, b) {
        var c = new (Uint8Array.prototype.constructor)(a.length + b.length);
        c.set(a, 0);
        c.set(b, a.length);
        return c;
    }

    (function () {
        var ALPHABET, ALPHABET_MAP, Base58, i;

        Base58 = (typeof module !== "undefined" && module !== null ? module.exports : void 0) || (window.Base58 = {});

        ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

        ALPHABET_MAP = {};

        i = 0;

        while (i < ALPHABET.length) {
            ALPHABET_MAP[ALPHABET.charAt(i)] = i;
            i++;
        }

        Base58.encode = function (buffer) {
            var carry, digits, j;
            if (buffer.length === 0) {
                return "";
            }
            i = void 0;
            j = void 0;
            digits = [0];
            i = 0;
            while (i < buffer.length) {
                j = 0;
                while (j < digits.length) {
                    digits[j] <<= 8;
                    j++;
                }
                digits[0] += buffer[i];
                carry = 0;
                j = 0;
                while (j < digits.length) {
                    digits[j] += carry;
                    carry = (digits[j] / 58) | 0;
                    digits[j] %= 58;
                    ++j;
                }
                while (carry) {
                    digits.push(carry % 58);
                    carry = (carry / 58) | 0;
                }
                i++;
            }
            i = 0;
            while (buffer[i] === 0 && i < buffer.length - 1) {
                digits.push(0);
                i++;
            }
            return digits.reverse().map(function (digit) {
                return ALPHABET[digit];
            }).join("");
        };

        Base58.decode = function (string) {
            var bytes, c, carry, j;
            if (string.length === 0) {
                return new (typeof Uint8Array !== "undefined" && Uint8Array !== null ? Uint8Array : Buffer)(0);
            }
            i = void 0;
            j = void 0;
            bytes = [0];
            i = 0;
            while (i < string.length) {
                c = string[i];
                if (!(c in ALPHABET_MAP)) {
                    throw "Base58.decode received unacceptable input. Character '" + c + "' is not in the Base58 alphabet.";
                }
                j = 0;
                while (j < bytes.length) {
                    bytes[j] *= 58;
                    j++;
                }
                bytes[0] += ALPHABET_MAP[c];
                carry = 0;
                j = 0;
                while (j < bytes.length) {
                    bytes[j] += carry;
                    carry = bytes[j] >> 8;
                    bytes[j] &= 0xff;
                    ++j;
                }
                while (carry) {
                    bytes.push(carry & 0xff);
                    carry >>= 8;
                }
                i++;
            }
            i = 0;
            while (string[i] === "1" && i < string.length - 1) {
                bytes.push(0);
                i++;
            }
            return new (typeof Uint8Array !== "undefined" && Uint8Array !== null ? Uint8Array : Buffer)(bytes.reverse());
        };

    }).call(this);


    function B2S_GET32(v, i) {
        return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
    }

    function B2S_G(a, b, c, d, x, y) {
        v[a] = v[a] + v[b] + x
        v[d] = ROTR32(v[d] ^ v[a], 16)
        v[c] = v[c] + v[d]
        v[b] = ROTR32(v[b] ^ v[c], 12)
        v[a] = v[a] + v[b] + y
        v[d] = ROTR32(v[d] ^ v[a], 8)
        v[c] = v[c] + v[d]
        v[b] = ROTR32(v[b] ^ v[c], 7)
    }

    function ROTR32(x, y) {
        return (x >>> y) ^ (x << (32 - y))
    }

    var BLAKE2S_IV = new Uint32Array([
        0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
        0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19])

    var SIGMA = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
        11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
        7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
        9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
        2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
        12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
        13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
        6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
        10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0])

    var v = new Uint32Array(16)
    var m = new Uint32Array(16)
    function blake2sCompress(ctx, last) {
        var i = 0
        for (i = 0; i < 8; i++) {
            v[i] = ctx.h[i]
            v[i + 8] = BLAKE2S_IV[i]
        }

        v[12] ^= ctx.t
        v[13] ^= (ctx.t / 0x100000000)
        if (last) {
            v[14] = ~v[14]
        }

        for (i = 0; i < 16; i++) {
            m[i] = B2S_GET32(ctx.b, 4 * i)
        }

        for (i = 0; i < 10; i++) {

            B2S_G(0, 4, 8, 12, m[SIGMA[i * 16 + 0]], m[SIGMA[i * 16 + 1]])
            B2S_G(1, 5, 9, 13, m[SIGMA[i * 16 + 2]], m[SIGMA[i * 16 + 3]])
            B2S_G(2, 6, 10, 14, m[SIGMA[i * 16 + 4]], m[SIGMA[i * 16 + 5]])
            B2S_G(3, 7, 11, 15, m[SIGMA[i * 16 + 6]], m[SIGMA[i * 16 + 7]])
            B2S_G(0, 5, 10, 15, m[SIGMA[i * 16 + 8]], m[SIGMA[i * 16 + 9]])
            B2S_G(1, 6, 11, 12, m[SIGMA[i * 16 + 10]], m[SIGMA[i * 16 + 11]])
            B2S_G(2, 7, 8, 13, m[SIGMA[i * 16 + 12]], m[SIGMA[i * 16 + 13]])
            B2S_G(3, 4, 9, 14, m[SIGMA[i * 16 + 14]], m[SIGMA[i * 16 + 15]])
        }

        for (i = 0; i < 8; i++) {
            ctx.h[i] ^= v[i] ^ v[i + 8]
        }
    }

    function blake2sInit(outlen, key) {
        if (!(outlen > 0 && outlen <= 32)) {
            throw new Error('Incorrect output length, should be in [1, 32]')
        }
        var keylen = key ? key.length : 0
        if (key && !(keylen > 0 && keylen <= 32)) {
            throw new Error('Incorrect key length, should be in [1, 32]')
        }

        var ctx = {
            h: new Uint32Array(BLAKE2S_IV),
            b: new Uint32Array(64),
            c: 0,
            t: 0,
            outlen: outlen
        }
        ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen

        if (keylen > 0) {
            blake2sUpdate(ctx, key)
            ctx.c = 64
        }

        return ctx
    }

    function blake2sUpdate(ctx, input) {
        for (var i = 0; i < input.length; i++) {
            if (ctx.c === 64) {
                ctx.t += ctx.c
                blake2sCompress(ctx, false)
                ctx.c = 0
            }
            ctx.b[ctx.c++] = input[i]
        }
    }

    function blake2sFinal(ctx) {
        ctx.t += ctx.c
        while (ctx.c < 64) {
            ctx.b[ctx.c++] = 0
        }
        blake2sCompress(ctx, true)

        var out = new Uint8Array(ctx.outlen)
        for (var i = 0; i < ctx.outlen; i++) {
            out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF
        }
        return out
    }

    function blake2s(input, key, outlen) {
        outlen = outlen || 32

        var ctx = blake2sInit(outlen, key)
        blake2sUpdate(ctx, input)
        return blake2sFinal(ctx)
    }

    function Fee(v) {
        let s = v > 0 ? 0 : 1;
        v = Math.abs(v);
        exp = v === 0 ? 0 : Math.log10(v);
        exp = Math.floor(exp >= 0 ? exp + 0.5 : exp - 0.5);
        v /= Math.pow(10, exp);
        if (v >= 1) {
            v *= 0.1;
            ++exp;
        }
        v = Number((v * 1024).toFixed(0));
        return { exp: exp + 18, man: v === 1024? 1023: v };
    }

    function NumbToByte(numb, CountByte) {
        let InnerId = new Uint8Array(CountByte);
        numb = String(numb);
        let i = 1;
        let index = 0;
        while (true) {
            InnerId[index] += (numb % 2) * i;
            numb = Math.floor(numb / 2);
            if (numb === 0) {
                break;
            }
            if (numb === 1) {
                var b = (numb % 2) * i * 2;
                if (b === 256) {
                    ++InnerId[index + 1];
                } else { 
                    InnerId[index] += (numb % 2) * i * 2;
                }
                break;
            }

            if (i === 128) {
                i = 1;
                index++;
            } else {
                i *= 2;
            }
        }
        return InnerId;
    }

    function Connect() {
        var transport = new Thrift.Transport("http://" + Url + ":" + Port + "/thrift/service/Api/");
        var protocol = new Thrift.Protocol(transport);
        return new APIClient(protocol);
    }

    window.SignCS = {
        CreateTransaction: CreateTransaction,
        Connect: Connect
    }; 
}());