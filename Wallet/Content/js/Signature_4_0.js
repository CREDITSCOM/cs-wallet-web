(function () {
    function ConstructTransaction(ApiConnect, Obj, Transac) {

        if (typeof Obj.source === "string") {
            try {
                Obj.source = Base58.decode(Obj.source);
            } catch (e) {
                return { result: "error", message: "Source is not correct" };
            }
        }

        if (typeof Obj.Priv === "string") {
            try {
                Obj.Priv = Base58.decode(Obj.Priv);
            } catch (e) {
                return { result: "error", message: "Priv is not correct" };
            }
        }

        if (typeof Obj.amount === "string") {
            Obj.amount = Obj.amount.replace(/,/, '.');
        }
        if (isNaN(Number(Obj.amount))) {
            return { result: "error", message: "Amount is not correct" };
        }

        if (typeof Obj.fee === "string") {
            Obj.fee = Obj.fee.replace(/,/, '.');
        }
        if (isNaN(Number(Obj.fee))) {
            return { result: "error", message: "Fee is not correct" };
        }

        if (Obj.smart !== undefined && Obj.smart.code !== undefined) {
            var TestCode = ApiConnect.SmartContractCompile(Obj.smart.code);
            if (TestCode.status.code > 0) {
                alert(TestCode.status.message);
                return null;
            }

        }

        var Trans;
        if (Transac === undefined) {
            Trans = new Transaction();
        } else { 
            Trans = Transac;
        }
    
        var TransId = ApiConnect.WalletTransactionsCountGet(Obj.source);
        if (TransId.status.message === "Success") {
            Trans.id = TransId.lastTransactionInnerId + 1;
        } else {
            Trans.id = 0;
        }

        var PerSign = new Uint8Array();

        var InnerId = NumbToByte(Trans.id, 6);

        var SourseId = ApiConnect.WalletIdGet(Obj.source);
        if (SourseId.walletId > 0) {
            Trans.source = GetBitArray(SourseId.walletId, 4);
            InnerId[5] += 128;
        } else {
            Trans.source = Obj.source;
        }

        if (Obj.smart !== undefined && Obj.smart.code !== undefined) {
            var SmartInnerId = NumbToByte(Trans.id, 6);

            let BytesC = concatTypedArrays(Obj.source, SmartInnerId);


            let ByteCodeList = ApiConnect.SmartContractCompile(Obj.smart.code);

            for (var index in ByteCodeList.byteCodeObjects) {
                let ByteCodeS = ByteCodeList.byteCodeObjects[index].byteCode;
                let BytesNC = new Uint8Array(ByteCodeS.length);
                for (i in ByteCodeS) {
                    BytesNC[Number(i)] = ByteCodeS[i].charCodeAt();
                }
                BytesC = concatTypedArrays(BytesC, BytesNC);
            }

            Trans.target = blake2s(BytesC);
        } else {
            if (typeof Obj.target === "string") {
                try {
                    Obj.target = Base58.decode(Obj.target);
                } catch (e) {
                    return { result: "error", message: "Source is not correct" };
                }
            }

            var TargetId = ApiConnect.WalletIdGet(Obj.target);
            if (TargetId.walletId > 0) {
                Trans.target = GetBitArray(TargetId.walletId, 4);
                InnerId[5] += 64;
            } else {
                Trans.target = Obj.target;
            }
        }

        let F = ((Number(Obj.amount) * 10 - Math.trunc(Obj.amount) * 10) / 10) * Math.pow(10, 18);

        Trans.amount = new Amount({
            integral: Math.trunc(Obj.amount),
            fraction: F
        });

        Trans.balance = new Amount({ integral: 0, fraction: 0 });
        Trans.currency = 1;
        Trans.timeCreation = new Date().valueOf();

        F = Fee(Number(Obj.fee));

        let FeeBits = "0";
        let FeeIntegral = NumbToBits(F.exp);
        if (FeeIntegral.length < 5) {
            while (FeeIntegral.length < 5) {
                FeeIntegral = "0" + FeeIntegral;
            }
        }
        let FeeFraction = NumbToBits(F.man);
        if (FeeFraction.length < 10) {
            while (FeeFraction.length < 10) {
                FeeFraction = "0" + FeeFraction;
            }
        }
        FeeBits += FeeIntegral + FeeFraction;

        Trans.fee = new AmountCommission({ commission: BitsToNumb(FeeBits) });

        PerSign = concatTypedArrays(PerSign, InnerId);
        PerSign = concatTypedArrays(PerSign, Trans.source);
        PerSign = concatTypedArrays(PerSign, Trans.target);
        PerSign = concatTypedArrays(PerSign, GetBitArray(Trans.amount.integral, 4));

        InnerId = NumbToByte(Trans.amount.fraction, 8);

        PerSign = concatTypedArrays(PerSign, InnerId);
        PerSign = concatTypedArrays(PerSign, BitsToByts(FeeBits).reverse());
        PerSign = concatTypedArrays(PerSign, new Uint8Array([Trans.currency]));

        if (Obj.smart !== undefined) {
            Trans.userFields = new Uint8Array([1]);

            Trans.smartContract = new SmartContractInvocation({
                method: "",
                params: [],
                forgetNewState: false,
                smartContractDeploy: new SmartContractDeploy({
                    sourceCode: Obj.smart.code,
                    hashState: "",
                    byteCodeObjects: [],
                    tokenStandart: 0
                })
            });

            let SmartPreString = new Uint8Array();

            PerSign = concatTypedArrays(PerSign, new Uint8Array([1]));


            let Bytes = new Uint8Array([11, 0, 1]);
            if (Obj.smart.method === undefined) {
                Bytes = concatTypedArrays(Bytes, new Uint8Array(4));
            } else {
                Trans.smartContract.method = Obj.smart.method;
                Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.method.length, 4).reverse());
                var Method = new Uint8Array(Obj.smart.method.length);
                for (let i in Obj.smart.method) {
                    Method[i] = Obj.smart.method[i].charCodeAt();
                }
                Bytes = concatTypedArrays(Bytes, Method);
            }

            SmartPreString = concatTypedArrays(SmartPreString, Bytes);

            Bytes = new Uint8Array([15, 0, 2, 12]);
            if (Obj.smart.params === undefined) {
                Bytes = concatTypedArrays(Bytes, new Uint8Array([0, 0, 0, 0]));
            } else {
                Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.params.length, 4).reverse());
                for (let i in Obj.smart.params) {
                    switch (Obj.smart.params[i].key) {
                        case "STRING":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([11, 0, 16]));
                            Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.params[i].value.length, 4).reverse());
                            var ParamBytes = new Uint8Array(Obj.smart.params[i].value.length + 1);

                            for (let j in Obj.smart.params[i].value) {
                                ParamBytes[j] = Obj.smart.params[i].value[j].charCodeAt();
                            }
                            Bytes = concatTypedArrays(Bytes, ParamBytes);
                            Trans.smartContract.params.push(new Variant({ v_string: Obj.smart.params[i].value }));

                            break;
                        case "INT":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([8, 0, 8]));
                            Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.params[i].value, 4).reverse());
                            Trans.smartContract.params.push(new Variant({ v_i32: Obj.smart.params[i].value }));
                            Bytes = concatTypedArrays(Bytes, new Uint8Array(1));
                            break;
                        case "DOUBLE":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([4, 0, 14]));
                            let view = new DataView(new ArrayBuffer(8));
                            view.setFloat64(0, Obj.smart.params[i].value);
                            var ParamBytes = new Uint8Array(9);
                            for (let i = 0; i < 8; i++) {
                                ParamBytes[i] = view.getInt8(i);
                            }
                            Bytes = concatTypedArrays(Bytes, ParamBytes);
                            Trans.smartContract.params.push(new Variant({ v_double: Obj.smart.params[i].value }));
                            break;
                        case "I16":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([6, 0, 3]));
                            Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.params[i].value, 2));
                            Trans.smartContract.params.push(new Variant({ v_i16: Obj.smart.params[i].value }));
                            Bytes = concatTypedArrays(Bytes, new Uint8Array(1));
                            break;
                        case "I8":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([3, 0, 2]));
                            Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.params[i].value, 1));
                            Trans.smartContract.params.push(new Variant({ v_i8: Obj.smart.params[i].value }));
                            Bytes = concatTypedArrays(Bytes, new Uint8Array(1));
                            break;
                        case "I64":
                            Bytes = concatTypedArrays(Bytes, new Uint8Array([10, 0, 5]));

                            InnerId = NumbToByte(Obj.smart.params[i].value, 8);

                            Bytes = concatTypedArrays(Bytes, InnerId);
                            Trans.smartContract.params.push(new Variant({ v_i64: Obj.smart.params[i].value }));
                            Bytes = concatTypedArrays(Bytes, new Uint8Array(1));
                            break;
                    }
                }
            }

            SmartPreString = concatTypedArrays(SmartPreString, Bytes);

            Bytes = new Uint8Array([2, 0, 3, 0]);
            if (Obj.smart.forgetNewState) {
                Trans.smartContract.forgetNewState = true;
                Bytes[3] = 1;
            }

            SmartPreString = concatTypedArrays(SmartPreString, Bytes);

            Bytes = new Uint8Array([12, 0, 4]);

            SmartPreString = concatTypedArrays(SmartPreString, Bytes);


            Bytes = new Uint8Array([11, 0, 1]);
            if (Obj.smart.code === undefined || Obj.smart.code === null) {
                Bytes = concatTypedArrays(Bytes, new Uint8Array(4));
            } else {

                Bytes = concatTypedArrays(Bytes, GetBitArray(Obj.smart.code.length, 4).reverse());

                Bytes = concatTypedArrays(Bytes, new Uint8Array(Obj.smart.code.length));

                for (i in Obj.smart.code) {
                    Bytes[Number(i) + 7] = Obj.smart.code[i].charCodeAt();
                }
            }
            SmartPreString = concatTypedArrays(SmartPreString, Bytes);

            Bytes = new Uint8Array([15, 0, 2, 12]);
            if (Obj.smart.code === undefined || Obj.smart.code === null) {
                Bytes = concatTypedArrays(Bytes, new Uint8Array(4));
            } else {
                var ByteCodeObjectS = ApiConnect.SmartContractCompile(Obj.smart.code).byteCodeObjects;

                Bytes = concatTypedArrays(Bytes, GetBitArray(ByteCodeObjectS.length, 4).reverse());

                for (var index in ByteCodeObjectS) {

                    var BCObject = ByteCodeObjectS[index];

                    Trans.smartContract.smartContractDeploy.byteCodeObjects[index] = new ByteCodeObject({
                        name: BCObject.name,
                        byteCode: BCObject.byteCode
                    });

                    Bytes = concatTypedArrays(Bytes, new Uint8Array([11, 0, 1]));


                    Bytes = concatTypedArrays(Bytes, GetBitArray(BCObject.name.length, 4).reverse());

                    let LocBytes = new Uint8Array(BCObject.name.length);
                    for (var i in BCObject.name) {
                        LocBytes[i] = BCObject.name[i].charCodeAt();
                    }

                    Bytes = concatTypedArrays(Bytes, LocBytes);

                    Bytes = concatTypedArrays(Bytes, new Uint8Array([11, 0, 2]));


                    Bytes = concatTypedArrays(Bytes, GetBitArray(BCObject.byteCode.length, 4).reverse());

                    LocBytes = new Uint8Array(BCObject.byteCode.length);
                    for (var i in BCObject.byteCode) {
                        LocBytes[i] = BCObject.byteCode[i].charCodeAt();
                    }

                    Bytes = concatTypedArrays(Bytes, LocBytes);
                    Bytes = concatTypedArrays(Bytes, new Uint8Array(1));
                }
            }


            SmartPreString = concatTypedArrays(SmartPreString, Bytes);

            SmartPreString = concatTypedArrays(SmartPreString, new Uint8Array([11, 0, 3, 0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0, 0]));

            PerSign = concatTypedArrays(PerSign, GetBitArray(SmartPreString.length, 4));
            PerSign = concatTypedArrays(PerSign, SmartPreString);

        } else {
            PerSign = concatTypedArrays(PerSign, new Uint8Array(1));
        }

        console.log(PerSign);
        console.log(PerSign.join(" "));

        var ArHex = "0123456789ABCDEF";
        var Hex = "";
        for (var j = 0; j < PerSign.length; j++) {
            Hex += ArHex[Math.floor(PerSign[j] / 16)];
            Hex += ArHex[Math.floor(PerSign[j] % 16)];
        }
        console.log(Hex);

        Trans.signature = nacl.sign.detached(PerSign, Obj.Priv);
        console.log(Trans);
        return Trans;
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
        exp = v == 0 ? 0 : Math.log10(v);
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
    lodash = {
        ConstructTransaction: ConstructTransaction,
        Connect: Connect
    }

    window.SignCS = lodash; 

}());