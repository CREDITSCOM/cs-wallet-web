using Base58Check;
using NodeApi;
using System;
using System.Collections.Generic;
using System.Linq;
using Thrift.Protocol;
using Thrift.Transport;
using Wallet.Models;
using Wallet.TransferModel;
using static NodeApi.API;

namespace Api.Service
{
    public class ApiWork_4_2
    {
        public readonly Client _connect;
        public readonly TSocket Soc;
        public readonly TBinaryProtocol _TBinProt;

        public ApiWork_4_2(string Ip)
        {
            Soc = new TSocket(Ip, 9090, 60000);
            _TBinProt = new TBinaryProtocol(Soc);
            _connect = new Client(_TBinProt);
            Soc.Open();
        }

        public ApiResult<BalanceCS> Balance(string Public)
        {
            ApiResult<BalanceCS> Res = new ApiResult<BalanceCS>
            {
                Result = null
            };


            byte[] PublicKey;
            try
            {
                PublicKey = Base58CheckEncoding.DecodePlain(Public);
            }
            catch (Exception)
            {
                Res.Message = "PublicKey error";
                return Res;
            }

            WalletBalanceGetResult Balance = _connect.WalletBalanceGet(PublicKey);

            if (Balance.Status.Code > 0 && Balance.Status.Message != "Not found")
            {
                Res.Message = Balance.Status.Message;
                return Res;
            }

            TokenBalancesResult Tokens = _connect.TokenBalancesGet(PublicKey);

            if (Tokens.Status.Code > 0 && Balance.Status.Message != "Not found")
            {
                Res.Message = Tokens.Status.Message;
                return Res;
            }

            Res.Result = new BalanceCS
            {
                CS = $"{Balance.Balance.Integral}.{FractionToStr(Balance.Balance.Fraction)}",
                Tokens = Tokens.Balances.Select(BalanceTokenModel).ToList(),
                PublicKey = Public
            };

            return Res;
        }

        //public ApiResult<object> UnsafeTransaction(TransactionCreateModel<string> model)
        //{
        //    ApiResult<object> Res = new ApiResult<object>() { Result = null};

        //    byte[] Private;
        //    try
        //    {
        //        Private = Base58CheckEncoding.DecodePlain(model.Priv);
        //    }
        //    catch (Exception)
        //    {
        //        Private = new byte[64];
        //    }


        //    byte[] Source;
        //    if (model.Source != null)
        //    {
        //        try
        //        {
        //            Source = Base58CheckEncoding.DecodePlain(model.Source);
        //        }
        //        catch (Exception)
        //        {
        //            Res.Message = "Source is incorrect";
        //            return Res;
        //        }
        //    }
        //    else
        //    {
        //        Source = new byte[32];
        //    }


        //    if (model.Amount == null)
        //    {
        //        model.Amount = "0,0";
        //    }
        //    else
        //    {
        //        model.Amount = model.Amount.Replace(".", ",").Replace(" ", "");
        //    }

        //    if (model.Fee == null)
        //    {
        //        model.Fee = "0,9";
        //    }
        //    else
        //    {
        //        model.Fee = model.Fee.Replace(".", ",").Replace(" ", "");
        //    }

        //    Transaction Trans = new Transaction
        //    {
        //        Source = Source
        //    };

        //    WalletTransactionsCountGetResult TransactionId = _connect.WalletTransactionsCountGet(Trans.Source);
        //    if (TransactionId.Status.Code == 0)
        //    {
        //        Trans.Id = TransactionId.LastTransactionInnerId + 1;
        //    }

        //    byte[] PervStr = NumbToByte(Trans.Id, 6);

        //    if (model.Smart != null && model.Smart.Code != null)
        //    {
        //        byte[] ByteC = Source;
        //        ConcatByteAr(ref ByteC, PervStr);

        //        SmartContractCompileResult ByteCodes = _connect.SmartContractCompile(model.Smart.Code);
        //        if (ByteCodes.Status.Code == 0)
        //        {
        //            foreach (ByteCodeObject item in ByteCodes.ByteCodeObjects)
        //            {
        //                ConcatByteAr(ref ByteC, item.ByteCode);
        //            }
        //        }

        //        Trans.Target = Blake2s.Blake2S.ComputeHash(ByteC);
        //    }
        //    else
        //    {
        //        try
        //        {
        //            Trans.Target = Base58CheckEncoding.DecodePlain(model.Target);
        //        }
        //        catch (Exception)
        //        {
        //            Res.Message = "Target is incorrect";
        //            return Res;
        //        }
        //    }

        //    string[] ArStrAmmount = model.Amount.Split(',');
        //    Trans.Amount = new Amount
        //    {
        //        Integral = Convert.ToInt32(ArStrAmmount[0])
        //    };
        //    if (ArStrAmmount.Length > 1)
        //        Trans.Amount.Fraction = (long)(ValidDouble("0." + ArStrAmmount[1]) * Math.Pow(10, 18));

        //    Trans.Balance = new Amount { Fraction = 0, Integral = 0 };

        //    Trans.Currency = 1;

        //    Trans.TimeCreation = DateTime.Now.Ticks;

        //    FeeRes F = Fee(ValidDouble(model.Fee));
        //    string FeeIntegral = Convert.ToString(F.Exp, 2);
        //    while (FeeIntegral.Length < 5)
        //    {
        //        FeeIntegral = "0" + FeeIntegral;
        //    }
        //    string FeeFraction = Convert.ToString(F.Mantic, 2);
        //    while (FeeFraction.Length < 10)
        //    {
        //        FeeFraction = "0" + FeeFraction;
        //    }
        //    string FeeBits = "0" + FeeIntegral + FeeFraction;

        //    Trans.Fee = new AmountCommission { Commission = Convert.ToInt16(BitsToNumb(FeeBits)) };

        //    ConcatByteAr(ref PervStr, Trans.Source);
        //    ConcatByteAr(ref PervStr, Trans.Target);
        //    ConcatByteAr(ref PervStr, NumbToByte(Convert.ToInt32(ArStrAmmount[0]), 4));
        //    if (ArStrAmmount.Length > 1)
        //        ConcatByteAr(ref PervStr, BitConverter.GetBytes(Trans.Amount.Fraction));
        //    else
        //        ConcatByteAr(ref PervStr, new byte[8]);

        //    ConcatByteAr(ref PervStr, ReverceByteAr(BitsToBytes(FeeBits)));
        //    ConcatByteAr(ref PervStr, new byte[1] { Convert.ToByte(Trans.Currency) });

        //    if (model.Smart == null && model.UserData == null)
        //    {
        //        ConcatByteAr(ref PervStr, new byte[1]);
        //    }
        //    else if(model.Smart != null)
        //    {
        //        ConcatByteAr(ref PervStr, new byte[1] { 1 });

        //        byte[] UserFilds = new byte[0];

        //        Trans.SmartContract = new SmartContractInvocation();


        //        ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });
        //        if (model.Smart.Method == null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[4]);
        //        }
        //        else
        //        {
        //            Trans.SmartContract.Method = model.Smart.Method;
        //            byte[] Method = new byte[model.Smart.Method.Length];
        //            for (int i = 0; i < model.Smart.Method.Length; i++)
        //            {
        //                Method[i] = Convert.ToByte(model.Smart.Method[i]);
        //            }
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Method.Length, 4)));
        //            ConcatByteAr(ref UserFilds, Method);
        //        }

        //        ConcatByteAr(ref UserFilds, new byte[4] { 15, 0, 2, 12 });
        //        if (model.Smart.Params == null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[4]);
        //        }
        //        else
        //        {
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Params.Count, 4)));
        //            Trans.SmartContract.Params = new List<Variant>();
        //            foreach (ParamsCreateModel item in model.Smart.Params)
        //            {
        //                switch (item.Key)
        //                {
        //                    case "STRING":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 17 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.Value.Length, 4)));
        //                        byte[] Params = new byte[item.Value.Length + 1];
        //                        for (int i = 0; i < item.Value.Length; i++)
        //                        {
        //                            Params[i] = Convert.ToByte(item.Value[i]);
        //                        }
        //                        ConcatByteAr(ref UserFilds, Params);
        //                        Trans.SmartContract.Params.Add(new Variant { V_string = item.Value });
        //                        break;
        //                    case "DOUBLE":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 4, 0, 15 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(BitConverter.GetBytes(Double.Parse(item.Value))));
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        Trans.SmartContract.Params.Add(new Variant { V_double = Double.Parse(item.Value) });
        //                        break;
        //                    case "INT":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 8, 0, 9 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(int.Parse(item.Value), 4)));
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        Trans.SmartContract.Params.Add(new Variant { V_int = int.Parse(item.Value) });
        //                        break;
        //                    case "BOOL":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 2, 0, 3 });
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        if (bool.Parse(item.Value))
        //                        {
        //                            UserFilds[UserFilds.Length - 1] = 1;
        //                        }
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        Trans.SmartContract.Params.Add(new Variant { V_boolean = bool.Parse(item.Value) });
        //                        break;
        //                }
        //            }
        //        }

        //        ConcatByteAr(ref UserFilds, new byte[8] { 15, 0, 3, 11, 0, 0, 0, 0 });

        //        ConcatByteAr(ref UserFilds, new byte[4] { 2, 0, 4, 0 });
        //        if (model.Smart.ForgetNewState)
        //        {
        //            UserFilds[UserFilds.Length - 1] = 1;
        //            Trans.SmartContract.ForgetNewState = true;
        //        }

        //        if (model.Smart.Code != null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[3] { 12, 0, 5 });
        //            ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });

        //            Trans.SmartContract.SmartContractDeploy = new SmartContractDeploy
        //            {
        //                SourceCode = model.Smart.Code,
        //                ByteCodeObjects = new List<ByteCodeObject>()
        //            };
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Code.Length, 4)));

        //            byte[] Code = new byte[model.Smart.Code.Length];

        //            for (int i = 0; i < model.Smart.Code.Length; i++)
        //            {
        //                Code[i] = Convert.ToByte(model.Smart.Code[i]);
        //            }

        //            ConcatByteAr(ref UserFilds, Code);

        //            ConcatByteAr(ref UserFilds, new byte[4] { 15, 0, 2, 12 });
        //            SmartContractCompileResult CompiledByteCode = _connect.SmartContractCompile(model.Smart.Code);

        //            if (CompiledByteCode.Status.Code > 0)
        //            {
        //                return null;
        //            }
        //            else
        //            {
        //                ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(CompiledByteCode.ByteCodeObjects.Count, 4)));

        //                foreach (ByteCodeObject item in CompiledByteCode.ByteCodeObjects)
        //                {
        //                    ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });
        //                    ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.Name.Length, 4)));
        //                    byte[] Bytes = new byte[item.Name.Length];
        //                    for (int i = 0; i < item.Name.Length; i++)
        //                    {
        //                        Bytes[i] = Convert.ToByte(item.Name[i]);
        //                    }
        //                    ConcatByteAr(ref UserFilds, Bytes);

        //                    ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 2 });
        //                    ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.ByteCode.Length, 4)));
        //                    Bytes = new byte[item.ByteCode.Length];
        //                    for (int i = 0; i < item.ByteCode.Length; i++)
        //                    {
        //                        Bytes[i] = Convert.ToByte(item.ByteCode[i]);
        //                    }
        //                    ConcatByteAr(ref UserFilds, Bytes);

        //                    Trans.SmartContract.SmartContractDeploy.ByteCodeObjects.Add(new ByteCodeObject
        //                    {
        //                        Name = item.Name,
        //                        ByteCode = item.ByteCode
        //                    });
        //                }
        //                ConcatByteAr(ref UserFilds, new byte[1]);
        //            }

        //            ConcatByteAr(ref UserFilds, new byte[15] { 11, 0, 3, 0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0 });
        //        }

        //        ConcatByteAr(ref UserFilds, new byte[1]);
        //        ConcatByteAr(ref PervStr, NumbToByte(UserFilds.Length, 4));
        //        ConcatByteAr(ref PervStr, UserFilds);
        //    }
        //    else if (model.UserData != null)
        //    {

        //        byte[] UserFilds = new byte[1] {1};
        //        ConcatByteAr(ref UserFilds, NumbToByte(model.UserData.Length, 4));
        //        byte[] ufb = new byte[model.UserData.Length];
        //        for (int i = 0; i < model.UserData.Length; i++)
        //        {
        //            ufb[i] = Convert.ToByte(model.UserData[i]);
        //        }
        //        ConcatByteAr(ref UserFilds, ufb);
        //        ConcatByteAr(ref PervStr, UserFilds);
        //        Trans.UserFields = ufb;
        //    }

        //    if (model.Priv != null)
        //    { 
        //        Rebex.Security.Cryptography.Ed25519 o = new Rebex.Security.Cryptography.Ed25519();
        //        o.FromPrivateKey(Private);
        //        Trans.Signature = o.SignMessage(PervStr);
        //    }

        //    string Ar16 = "0123456789ABCDEF";
        //    string Hex = "";

        //    foreach (var i in PervStr)
        //    {
        //        Hex += Ar16[i >> 4];
        //        Hex += Ar16[i & 15];
        //    }

        //    TransactionFlowResult TransRes = _connect.TransactionFlow(Trans);

        //    if (TransRes.Status.Code > 0)
        //    {
        //        Res.Message = TransRes.Status.Message;
        //    }
        //    else
        //    {
        //        Res.Result = TransRes;
        //    }

        //    return Res;
        //}


        //public ApiResult<PervStrModel> CreatePervStr(TransactionCreateModel<string> model)
        //{
        //    ApiResult<PervStrModel> Res = new ApiResult<PervStrModel>();

        //    byte[] Source;
        //    try
        //    {
        //        Source = Base58CheckEncoding.DecodePlain(model.Source);
        //    }
        //    catch (Exception)
        //    {
        //        Res.Message = "Source is incorrect";
        //        return Res;
        //    }

        //    if (model.Amount == null)
        //    {
        //        model.Amount = "0,0";
        //    }
        //    else
        //    {
        //        model.Amount = model.Amount.Replace(".", ",").Replace(" ", "");
        //    }

        //    if (model.Fee == null)
        //    {
        //        Res.Message = "Fee is not found";
        //        return Res;
        //    }
        //    else
        //    {
        //        model.Fee = model.Fee.Replace(".", ",").Replace(" ", "");
        //    }

        //    PervStrModel ResPervStr = new PervStrModel
        //    {
        //        Source = model.Source
        //    };

        //    WalletTransactionsCountGetResult TransactionId = _connect.WalletTransactionsCountGet(Source);
        //    if (TransactionId.Status.Code == 0)
        //    {
        //        ResPervStr.Id = TransactionId.LastTransactionInnerId + 1;
        //    }

        //    byte[] PervStr = NumbToByte(ResPervStr.Id, 6);

        //    byte[] Target;

        //    if (model.Smart != null && model.Smart.Code != null)
        //    {
        //        byte[] ByteC = Source;
        //        ConcatByteAr(ref ByteC, PervStr);

        //        SmartContractCompileResult ByteCodes = _connect.SmartContractCompile(model.Smart.Code);
        //        if (ByteCodes.Status.Code == 0)
        //        {
        //            foreach (ByteCodeObject item in ByteCodes.ByteCodeObjects)
        //            {
        //                ConcatByteAr(ref ByteC, item.ByteCode);
        //            }
        //        }

        //        Target = Blake2s.Blake2S.ComputeHash(ByteC);

        //        ResPervStr.Target = Base58CheckEncoding.EncodePlain(Target);
        //    }
        //    else
        //    {
        //        ResPervStr.Target = model.Target;

        //        try
        //        {
        //            Target = Base58CheckEncoding.DecodePlain(ResPervStr.Target);
        //        }
        //        catch (Exception)
        //        {
        //            Res.Message = "Target is incorrect";
        //            return Res;
        //        }
        //    }

        //    ResPervStr.Amount = model.Amount;

        //    string[] ArStrAmmount = model.Amount.Split(',');

        //    FeeRes F = Fee(Convert.ToDouble(model.Fee.Replace(',','.')));
        //    string FeeIntegral = Convert.ToString(F.Exp, 2);
        //    while (FeeIntegral.Length < 5)
        //    {
        //        FeeIntegral = "0" + FeeIntegral;
        //    }
        //    string FeeFraction = Convert.ToString(F.Mantic, 2);
        //    while (FeeFraction.Length < 10)
        //    {
        //        FeeFraction = "0" + FeeFraction;
        //    }
        //    string FeeBits = "0" + FeeIntegral + FeeFraction;
        //    ResPervStr.Fee = BitsToNumb(FeeBits).ToString();

        //    ConcatByteAr(ref PervStr, Source);
        //    ConcatByteAr(ref PervStr, Target);
        //    ConcatByteAr(ref PervStr, NumbToByte(Convert.ToInt32(ArStrAmmount[0]), 4));
        //    if (ArStrAmmount.Length > 1)
        //        ConcatByteAr(ref PervStr, NumbToByte(Convert.ToInt64(Convert.ToDecimal("0." + ArStrAmmount[1]) * 1000000000000000000), 8));
        //    else
        //        ConcatByteAr(ref PervStr, new byte[8]);
        //    ConcatByteAr(ref PervStr, ReverceByteAr(BitsToBytes(FeeBits)));
        //    ConcatByteAr(ref PervStr, new byte[1] { 1 });

        //    var Trans = new Transaction{
        //        SmartContract = new SmartContractInvocation {

        //        }
        //    };


        //    if (model.Smart == null)
        //    {
        //        ConcatByteAr(ref PervStr, new byte[1]);
        //    }
        //    else
        //    {
        //        ConcatByteAr(ref PervStr, new byte[1] { 1 });

        //        byte[] UserFilds = new byte[0];

        //        ResPervStr.Smart = new ContSmart();

        //        ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });
        //        if (model.Smart.Method == null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[4]);
        //        }
        //        else
        //        {
        //            ResPervStr.Smart.Method = model.Smart.Method;
        //            byte[] Method = new byte[model.Smart.Method.Length];
        //            for (int i = 0; i < model.Smart.Method.Length; i++)
        //            {
        //                Method[i] = Convert.ToByte(model.Smart.Method[i]);
        //            }
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Method.Length, 4)));
        //            ConcatByteAr(ref UserFilds, Method);
        //        }

        //        ConcatByteAr(ref UserFilds, new byte[4] { 15, 0, 2, 12 });
        //        if (model.Smart.Params == null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[4]);
        //        }
        //        else
        //        {
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Params.Count, 4)));
        //            ResPervStr.Smart.Params = new List<ParamsCreateModel>();
        //            foreach (ParamsCreateModel item in model.Smart.Params)
        //            {
        //                byte[] Params;
        //                switch (item.Key)
        //                {
        //                    case "STRING":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 17 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.Value.Length, 4)));
        //                        Params = new byte[item.Value.Length + 1];
        //                        for (int i = 0; i < item.Value.Length; i++)
        //                        {
        //                            Params[i] = Convert.ToByte(item.Value[i]);
        //                        }
        //                        ConcatByteAr(ref UserFilds, Params);
        //                        ResPervStr.Smart.Params.Add(item);
        //                        break;
        //                    case "DOUBLE":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 4, 0, 15 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(BitConverter.GetBytes(Double.Parse(item.Value))));
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        ResPervStr.Smart.Params.Add(item);
        //                    break;
        //                    case "INT":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 8, 0, 9 });
        //                        ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(int.Parse(item.Value), 4)));
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        ResPervStr.Smart.Params.Add(item);
        //                        break;
        //                    case "BOOL":
        //                        ConcatByteAr(ref UserFilds, new byte[3] { 2, 0, 3 });
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        if (bool.Parse(item.Value))
        //                        {
        //                            UserFilds[UserFilds.Length - 1] = 1;
        //                        }
        //                        ConcatByteAr(ref UserFilds, new byte[1]);
        //                        ResPervStr.Smart.Params.Add(item);
        //                        break;
        //                }
        //            }
        //        }

        //        ConcatByteAr(ref UserFilds, new byte[8] { 15, 0, 3, 11, 0, 0, 0, 0 });

        //        ConcatByteAr(ref UserFilds, new byte[4] { 2, 0, 4, 0 });
        //        if (model.Smart.ForgetNewState)
        //        {
        //            UserFilds[UserFilds.Length - 1] = 1;
        //            ResPervStr.Smart.ForgetNewState = true;
        //        }

        //        if (model.Smart.Code != null)
        //        {
        //            ConcatByteAr(ref UserFilds, new byte[3] { 12, 0, 5 });
        //            ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });

        //            ResPervStr.Smart.Deploy = new Deploy
        //            {
        //                Code = model.Smart.Code
        //            };
        //            ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(model.Smart.Code.Length, 4)));

        //            byte[] Code = new byte[model.Smart.Code.Length];

        //            for (int i = 0; i < model.Smart.Code.Length; i++)
        //            {
        //                Code[i] = Convert.ToByte(model.Smart.Code[i]);
        //            }

        //            ConcatByteAr(ref UserFilds, Code);
                
        //            ConcatByteAr(ref UserFilds, new byte[4] { 15, 0, 2, 12 });
        //            SmartContractCompileResult CompiledByteCode = _connect.SmartContractCompile(model.Smart.Code);

        //            if (CompiledByteCode.Status.Code > 0)
        //            {
        //                Res.Message = CompiledByteCode.Status.Message;
        //                return Res;
        //            }
        //            else
        //            {
        //                ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(CompiledByteCode.ByteCodeObjects.Count, 4)));

        //                foreach (ByteCodeObject item in CompiledByteCode.ByteCodeObjects)
        //                {
        //                    ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 1 });
        //                    ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.Name.Length, 4)));
        //                    byte[] Bytes = new byte[item.Name.Length];
        //                    for (int i = 0; i < item.Name.Length; i++)
        //                    {
        //                        Bytes[i] = Convert.ToByte(item.Name[i]);
        //                    }
        //                    ConcatByteAr(ref UserFilds, Bytes);

        //                    ConcatByteAr(ref UserFilds, new byte[3] { 11, 0, 2 });
        //                    ConcatByteAr(ref UserFilds, ReverceByteAr(NumbToByte(item.ByteCode.Length, 4)));
        //                    Bytes = new byte[item.ByteCode.Length];
        //                    for (int i = 0; i < item.ByteCode.Length; i++)
        //                    {
        //                        Bytes[i] = Convert.ToByte(item.ByteCode[i]);
        //                    }
        //                    ConcatByteAr(ref UserFilds, Bytes);
        //                    ConcatByteAr(ref UserFilds, new byte[1]);
        //                }
        //            }

        //            ConcatByteAr(ref UserFilds, new byte[15] { 11, 0, 3, 0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0});


        //        }

        //        ConcatByteAr(ref UserFilds, new byte[1]);
        //        ConcatByteAr(ref PervStr, NumbToByte(UserFilds.Length, 4));
        //        ConcatByteAr(ref PervStr, UserFilds);
        //    }

        //    string Ar16 = "0123456789ABCDEF";
        //    ResPervStr.Priv = "";

        //    foreach (var i in PervStr)
        //    {
        //        ResPervStr.Priv += Ar16[i >> 4];
        //        ResPervStr.Priv += Ar16[i & 15];
        //    }

        //    Res.Result = ResPervStr;
        //    return Res;
        //}

        //public ApiResult<bool> Send(PervStrModel model)
        //{
        //    ApiResult<bool> Res = new ApiResult<bool>
        //    {
        //        Result = false
        //    };


        //    Transaction Trans = new Transaction
        //    {
        //        Id = model.Id,
        //        TimeCreation = DateTime.Now.Ticks,
        //        Balance = new Amount { Integral = 0, Fraction = 0 },
        //        Currency = 1,
        //        Fee = new AmountCommission { Commission = Convert.ToInt16(model.Fee) },
        //        Signature = new byte[64]
        //    };


        //    if (model.Priv == null)
        //    {
        //        Res.Message = "Signature is not found";
        //        return Res;
        //    }
        //    else
        //    {
        //        string Ar16 = "0123456789ABCDEF";

        //        for (int i = 0; i < model.Priv.Length; i++)
        //        {
        //            for (int j = 0; j < Ar16.Length; j++)
        //            {
        //                if (Ar16[j] == model.Priv[i])
        //                {
        //                    Trans.Signature[i / 2] += Convert.ToByte(j * 16);
        //                }

        //                if (Ar16[j] == model.Priv[i + 1])
        //                {
        //                    Trans.Signature[i / 2] += Convert.ToByte(j);
        //                }
        //            }
        //            i++;
        //        }
        //    }

        //    try
        //    {
        //        Trans.Source = Base58CheckEncoding.DecodePlain(model.Source);
        //    }
        //    catch (Exception)
        //    {
        //        Res.Message = "Source is incorrect";
        //        return Res;
        //    }

        //    try
        //    {
        //        Trans.Target = Base58CheckEncoding.DecodePlain(model.Target);
        //    }
        //    catch (Exception)
        //    {
        //        Res.Message = "Target is incorrect";
        //        return Res;
        //    }

        //    if (model.Amount == null)
        //    {
        //        Trans.Amount = new Amount { Integral = 0, Fraction = 0 };
        //    }
        //    else
        //    {
        //        model.Amount = model.Amount.Replace(".", ",").Replace(" ", "");
        //        string[] ArStrAmmount = model.Amount.Split(',');
        //        Trans.Amount = new Amount
        //        {
        //            Integral = Convert.ToInt32(ArStrAmmount[0])
        //        };
        //        if (ArStrAmmount.Length > 1)
        //        {
        //            Trans.Amount.Fraction = Convert.ToInt64(Convert.ToDecimal("0." + ArStrAmmount[1]) * 1000000000000000000);
        //        }
        //    }

        //    if (model.Smart != null)
        //    {
        //        Trans.SmartContract = new SmartContractInvocation
        //        {
        //            ForgetNewState = model.Smart.ForgetNewState
        //        };

        //        if (model.Smart.Deploy == null)
        //        {
        //            Trans.SmartContract.Method = model.Smart.Method;

        //            if (model.Smart.Params != null)
        //            {

        //                Trans.SmartContract.Params = new List<Variant>();


        //                foreach (var item in model.Smart.Params)
        //                {
        //                    switch (item.Key)
        //                    {
        //                        case "STRING":
        //                            Trans.SmartContract.Params.Add(new Variant { V_string = item.Value });
        //                            break;
        //                        case "DOUBLE":
        //                            Trans.SmartContract.Params.Add(new Variant { V_double = Convert.ToDouble(item.Value) });
        //                        break;

        //                    }
        //                }
        //            }

        //        }
        //        else
        //        {
        //            Trans.SmartContract.SmartContractDeploy = new SmartContractDeploy
        //            {
        //                SourceCode = model.Smart.Deploy.Code
        //            };

        //            SmartContractCompileResult ByteCodes = _connect.SmartContractCompile(model.Smart.Deploy.Code);

        //            if (ByteCodes.Status.Code > 0)
        //            {
        //                Res.Message = ByteCodes.Status.Message;
        //                return Res;
        //            }

        //            Trans.SmartContract.SmartContractDeploy.ByteCodeObjects = new List<ByteCodeObject>();

        //            foreach (ByteCodeObject item in ByteCodes.ByteCodeObjects)
        //            {
        //                Trans.SmartContract.SmartContractDeploy.ByteCodeObjects.Add(new ByteCodeObject
        //                {
        //                    Name = item.Name,
        //                    ByteCode = item.ByteCode
        //                });
        //            }
        //        }

        //    }

        //    TransactionFlowResult TransRes = _connect.TransactionFlow(Trans);

        //    if (TransRes.Status.Code > 0)
        //    {
        //        Res.Message = TransRes.Status.Message;
        //    }
        //    else
        //    {
        //        Res.Result = true;
        //    }

        //    return Res;
        //}

        public ApiResult<List<SmartContractInfo>> SmartContract(string Key)
        {
            ApiResult<List<SmartContractInfo>> Res = new ApiResult<List<SmartContractInfo>>
            {
                Result = null
            };

            byte[] Public;

            try
            {
                Public = Base58CheckEncoding.DecodePlain(Key);
            }
            catch (Exception)
            {
                Res.Message = "Public key is not valid";
                return Res;
            }

            SmartContractDataResult Smart = _connect.SmartContractDataGet(Public);

            if (Smart.Status.Code > 0)
            {
                Res.Message = Smart.Status.Message;
                return Res;
            }

            Res.Result = new List<SmartContractInfo>();
            foreach (SmartContractMethod item in Smart.Methods)
            {
                SmartContractInfo Info = new SmartContractInfo
                {
                    ReturnType = item.ReturnType,
                    Name = item.Name,
                    Arguments = new List<SmartArgument>()
                };

                foreach (SmartContractMethodArgument i in item.Arguments)
                {
                    Info.Arguments.Add(new SmartArgument
                    {
                        Name = i.Name,
                        Type = i.Type
                    });
                }

                Res.Result.Add(Info);
            }

            return Res;
        }

        private double ValidDouble(string v)
        {
            double Dot;
            try
            {
                Dot = Double.Parse(v.Replace(",", "."));
            }
            catch (Exception)
            {
                Dot = Double.Parse(v.Replace(".", ","));
            }
            double Comma;
            try
            {
                Comma = Double.Parse(v.Replace(".", ","));
            }
            catch (Exception)
            {
                Comma = Double.Parse(v.Replace(",", "."));
            }
            return Dot > Comma ? Comma : Dot;
        }

        private byte[] StringToByte(string Str)
        {
            byte[] B = new byte[Str.Length];
            for (var i = 0; i < Str.Length; i++)
            {
                B[i] = (byte)Str[i];
            }
            return B;
        }

        private void ConcatByteAr(ref byte[] Arr1, byte[] Arr2)
        {
            byte[] Byte = new byte[Arr1.Length + Arr2.Length];

            for (int i = 0; i < Arr1.Length; i++)
            {
                Byte[i] = Arr1[i];
            }

            for (int i = 0; i < Arr2.Length; i++)
            {
                Byte[i + Arr1.Length] = Arr2[i];
            }
            Arr1 = Byte;
        }

        private byte[] ReverceByteAr(byte[] Ar)
        {
            byte[] Res = new byte[Ar.Length];
            for (var i = 0; i < Ar.Length; i++)
            {
                Res[i] = Ar[Ar.Length - (1 + i)];
            }
            return Res;
        }

        private byte[] NumbToByte(long Numb, int CountByte)
        {
            byte[] Byte = new byte[CountByte];

            int i = 1;
            int index = 0;
            while (true)
            {
                Byte[index] += Convert.ToByte((Numb % 2) * i);
                Numb = Numb / 2;

                if (Numb == 0)
                {
                    break;
                }
                else if (Numb == 1)
                {
                    long b = (Numb % 2) * i * 2;
                    if (b == 256)
                    {
                        ++Byte[index + 1];
                    }
                    else
                    {
                        Byte[index] += Convert.ToByte((Numb % 2) * i * 2);
                    }
                    break;
                }

                if (i == 128)
                {
                    i = 1;
                    index++;
                }
                else
                {
                    i *= 2;
                }
            }
            return Byte;
        }

        private byte[] NumbToByte(int Numb, int CountByte)
        {
            byte[] Byte = new byte[CountByte];

            int i = 1;
            int index = 0;
            while (true)
            {
                Byte[index] += Convert.ToByte((Numb % 2) * i);
                Numb = Numb / 2;

                if (Numb == 0)
                {
                    break;
                }
                else if (Numb == 1)
                {
                    long b = (Numb % 2) * i * 2;
                    if (b == 256)
                    {
                        ++Byte[index + 1];
                    }
                    else
                    {
                        Byte[index] += Convert.ToByte((Numb % 2) * i * 2);
                    }
                    break;
                }

                if (i == 128)
                {
                    i = 1;
                    index++;
                }
                else
                {
                    i *= 2;
                }
            }
            return Byte;
        }

        public byte[] BitsToBytes(string Bits)
        {
            int Lng = 0;
            Lng = Bits.Length / 8;
            if (Bits.Length % 8 > 0)
            {
                ++Lng;
            }

            byte[] Bytes = new byte[Lng];
            int Stage = 1;
            int i = Bits.Length - 1;
            while (true)
            {
                int B = Convert.ToInt32(Bits[i].ToString());
                if ((i + 1) % 8 == 0)
                {
                    Stage = 1;
                }

                Bytes[i / 8] += Convert.ToByte(Stage * B);
                Stage *= 2;
                if (i == 0)
                {
                    break;
                }
                --i;
            }
            return Bytes;
        }

        public int BitsToNumb(string Bits)
        {
            int numb = 0;
            int mnoj = 1;
            for (int i = Bits.Length - 1; i > 0; i--)
            {
                int B = Convert.ToInt32(Bits[i].ToString());
                if (B != 0)
                {
                    numb += mnoj * B;
                }
                mnoj *= 2;
            }
            return numb;
        }

        public FeeRes Fee(double val)
        {
            val = Math.Abs(val);
            double exp = val == 0 ? 0 : Math.Log10(val);
            int e = Convert.ToInt32(exp >= 0 ? exp + 0.5 : exp - 0.5);
            val /= Math.Pow(10, e);
            if (val >= 1)
            {
                val *= 0.1;
                ++e;
            }
            return new FeeRes { Exp = e + 18, Mantic = Convert.ToInt32(val * 1024) == 1024 ? 1023 : Convert.ToInt32(val * 1024) };
        }

        public string FractionToStr(long Fraction)
        {
            double res = Fraction / Math.Pow(10, 18);
            if (res == 0)
                return "0";
            else
                return res.ToString().Substring(2);
        }

        public BalanceToken BalanceTokenModel(TokenBalance model)
        {
            return new BalanceToken
            {
                Code = model.Code,
                Token = Base58CheckEncoding.EncodePlain(model.Token),
                Balance = model.Balance
            };
        }

        public static double ConvertCommission(short c)
        {
            var sign = c >> 15;
            var m = c & 0x3FF;
            var f = (c >> 10) & 0x1F;
            const double v1024 = 1.0 / 1024;
            return (sign != 0u ? -1.0 : 1.0) * m * v1024 * Math.Pow(10.0, f - 18);
        }

        public void Dispose()
        {
            _connect.Dispose();
        }
    }

    public class FeeRes
    {
        public int Exp { get; set; }

        public int Mantic { get; set; }
    }


    public class TransactionGenModel
    {
        public string Source { get; set; }

        public string Priv { get; set; }

        public string Target { get; set; }

        public string Amount { get; set; }

        public string Fee { get; set; }

        public ContSmart Smart { get; set; }
    }

    public class PervStrModel : TransactionGenModel
    {
        public long Id { get; set; }
    }

    public class ContSmart
    {
        public string Method { get; set; }

        //public List<ParamsCreateModel> Params { get; set; }

        public bool ForgetNewState { get; set; }

        public Deploy Deploy { get; set; }
    }

    public class Deploy
    {
        public string Code { get; set; }
    }

    

    public class ApiResult<T>
    {
        public string Message { get; set; }

        public T Result { get; set; }
    }

    public class BalanceCS
    {
        public string PublicKey { get; set; }

        public string CS { get; set; }

        public List<BalanceToken> Tokens { get; set; }
    }

    public class BalanceToken
    {
        public string Code { get; set; }

        public string Token { get; set; }

        public string Balance { get; set; }
    }
}