using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Thrift.Collections;

namespace Credtis_Api_Connect.Model
{
    public interface IApiWork : IDisposable
    {
        API_TransactionFlowResult SendTransaction(CreateTransactionModel model, byte[] PrivateKey);
        API_TransactionFlowResult SendTransaction(CreateTransactionModel model, string Sign);
        API_TransactionFlowResult SendTransaction(CreateTransactionModel model);
        List<API_History> СonvertedHistory(byte[] PublicKey, int Page = 1, int Size = 100);
        List<WalletAllBalance> Balance(byte[] PublicKey);
        byte[] GetSignature(CreateTransactionModel model);
        List<API_SmartContractInfo> SmartContract(byte[] Key);
        List<API_TokenTransfer> TokenTransferTransaction(byte[] Token, byte[] Wallet, int Page, int Limit);
        T SendTransaction<T>(CreateTransactionModel model, byte[] PrivateKey) where T : CreateTransactionModel;
    }

    public class API_TransactionFlowResult
    {
        public API_APIResponse Status { get; set; }
        public API_Variant Smart_contract_result { get; set; }
    }

    public class API_APIResponse
    {
        public sbyte Code { get; set; }
        public string Message { get; set; }
    }

    public class API_SmartContractInfo
    {
        public List<API_SmartArgument> Arguments { get; set; }

        public string ReturnType { get; set; }

        public string Name { get; set; }
    }

    public class API_SmartArgument
    {
        public string Name { get; set; }

        public string Type { get; set; }
    }

    public abstract class API_ExtraFee
    {
        public decimal sum;
        public string comment;
        public string transactionId;
    }

    public abstract class API_SmartContract
    {
        public string Method { get; set; }
        public List<API_Variant> Params { get; set; }
        public List<byte[]> UsedContracts { get; set; }
        public bool ForgetNewState { get; set; }
        public API_SmartContractDeploy SmartContractDeploy { get; set; }
    }

    public abstract class API_SmartContractDeploy
    {
        public string SourceCode { get; set; }
        public List<API_ByteCodeObject> ByteCodeObjects { get; set; }
        public int TokenStandart { get; set; }
    }

    public abstract class API_TokenDeployTransInfo
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int Standart { get; set; }
        public API_SmartOperationState State { get; set; }
        public string StateTransaction { get; set; }
    }

    public abstract class API_TokenTransferTransInfo
    {
        public string Code { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Amount { get; set; }
        public API_SmartOperationState State { get; set; }
        public string StateTransaction { get; set; }
        public bool TransferSuccess { get; set; }
    }

    public abstract class API_SmartDeployTransInfo
    {
        public API_SmartOperationState State { get; set; }
        public string StateTransaction { get; set; }
    }

    public abstract class API_SmartExecutionTransInfo
    {
        public string Method { get; set; }
        public List<API_Variant> Params { get; set; }
        public API_SmartOperationState State { get; set; }
        public string StateTransaction { get; set; }
    }

    public abstract class API_SmartState
    {
        public bool Success { get; set; }
        public decimal ExecutionFee { get; set; }
        public API_Variant ReturnValue { get; set; }
        public string StartTransaction { get; set; }
    }

    public abstract class API_SmartTransInfo
    {
        public API_TokenDeployTransInfo TokenDeploy;
        public API_TokenTransferTransInfo TokenTransfer;
        public API_SmartDeployTransInfo SmartDeploy;
        public API_SmartExecutionTransInfo SmartExecution;
        public API_SmartState SmartState;
    }

    public enum API_SmartOperationState
    {
        SOS_Pending = 0,
        SOS_Success = 1,
        SOS_Failed = 2,
    }

    public enum API_TransactionType
    {
        TT_Normal = 0,
        TT_SmartDeploy = 1,
        TT_SmartExecute = 2,
        TT_SmartState = 3,
    }

    public abstract class API_History
    {
        public string id;
        public string source;
        public string target;
        public decimal amount;
        public double fee;
        public DateTime timeCreation;
        public byte[] userFields;
        public API_TransactionType type;
        public List<API_ExtraFee> extraFee;
        public API_SmartTransInfo smartInfo;
        public API_SmartContract smartContract;
    }

    public abstract class API_ByteCodeObject
    {
        public string Name { get; set; }
        public byte[] ByteCode { get; set; }
    }

    public class CreateTransactionModel
    {
        public byte[] Source { get; set; }
        public byte[] Target { get; set; }
        public double Amount { get; set; }
        public double Fee { get; set; }
        public byte[] UserData { get; set; }
        public SmartContractCreateModel SmartContract { get; set; }
        public string[] UsedContracts { get; set; }

        public CreateTransactionModel(TransactionCreateModel model)
        {
            Amount = model.Amount == null? 0 : double.Parse(model.Amount);
            Fee = model.Fee == null? 0.01 : double.Parse(model.Fee); 
            Source = model.Source == null? null : Base58Check.Base58CheckEncoding.DecodePlain(model.Source);
            UsedContracts = model.UsedContracts;
            Target = model.Target == null? null : Base58Check.Base58CheckEncoding.DecodePlain(model.Target);
            UserData = model.UserData == null? null : Urilite.StringToByte(model.UserData);
            SmartContract = model.Smart == null? new SmartContractCreateModel() : new SmartContractCreateModel(model.Smart);
        }
    }

    public struct SmartContractCreateModel
    {
        public string Method { get; set; }
        public List<API_Variant> Params { get; set; }
        public bool ForgetNewState { get; set; }
        public string Code { get; set; }
        public List<string> UsedContract { get; set; }

        public SmartContractCreateModel(SmartCreateModel m)
        {
            Method = m.Method;
            Code = m.Code;
            ForgetNewState = m.ForgetNewState;
            Params = m.Params?.Select(p => API_Variant.SetParams(p)).ToList();
            UsedContract = m.UsedContract;
        }
    }

    public class API_Variant
    {
        public string V_null;
        public sbyte V_void;
        public bool? V_boolean;
        public byte V_byte;
        public short V_short;
        public int? V_int;
        public long V_long;
        public double V_float;
        public double V_double;
        public string V_string;
        public V_Object V_object;
        public List<API_Variant> V_array;
        public List<API_Variant> V_list;
        public THashSet<API_Variant> V_set;
        public Dictionary<API_Variant, API_Variant> V_map;
        public string V_big_decimal;
        public decimal? V_amount;
        public byte[] V_byte_array;
        public ParamsType Type;

        public abstract class V_Object
        {
            public string NameClass;
            public byte[] Instance;
        }

        public static API_Variant SetParams(ParamsCreateModel m)
        {
            switch (m.Key)
            {
                case "STRING":
                    return new API_Variant{V_string = m.Value};
                case "BOOL":
                    return new API_Variant { V_boolean = bool.Parse(m.Value) };
                case "INT":
                    return new API_Variant { V_int = int.Parse(m.Value) };
                case "DOUBLE":
                    return new API_Variant { V_double = double.Parse(m.Value) };
            }
            throw new Exception($"Type {m.Key} not defined");
        }
    }

    public enum ParamsType : byte
    {
        T_string,
        T_int,
        T_bool,
        T_double
    }

    public class TransactionCreateModel
    {
        public string Amount { get; set; }
        public string Fee { get; set; }
        public string Source { get; set; }
        public string Priv { get; set; }
        public string Target { get; set; }
        public string UserData { get; set; }
        public string[] UsedContracts { get; set; }
        public SmartCreateModel Smart { get; set; }
    }

    public class SmartCreateModel
    {
        public string Method { get; set; }
        public List<ParamsCreateModel> Params { get; set; }
        public bool ForgetNewState { get; set; }
        public string Code { get; set; }
        public List<string> UsedContract { get; set; }
    }

    public class ParamsCreateModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }

    public struct WalletAllBalance
    {
        public string publicKey;
        public double balance;
        public string code;
        public string name;

        public static WalletAllBalance Create(double Balance, string PublicKey = null, string Code = null, string Name = null)
        {
            return new WalletAllBalance
            {
                balance = Balance,
                publicKey = PublicKey,
                code = Code,
                name = Name
            };
        }
        public static WalletAllBalance Create(decimal Balance, string PublicKey = null, string Code = null, string Name = null)
        {
            return new WalletAllBalance
            {
                balance = (double)Balance,
                publicKey = PublicKey,
                code = Code,
                name = Name
            };
        }
    }

    public class API_TokenTransfer
    {
        public string Token { get; set; }
        public string Code { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Amount { get; set; }
        public string Initiator { get; set; }
        public string Transaction { get; set; }
        public long Time { get; set; }
    }


    public sealed class Urilite
    {
        public static double BcFeeConvert(short c)
        {
            var sign = c >> 15;
            var m = c & 0x3FF;
            var f = (c >> 10) & 0x1F;
            const double v1024 = 1.0 / 1024;
            return (sign != 0u ? -1.0 : 1.0) * m * v1024 * Math.Pow(10.0, f - 18);
        }

        public static void ConcatByteAr(ref byte[] Arr1, byte[] Arr2)
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

        public static byte[] ReverceByteAr(byte[] Ar)
        {
            byte[] Res = new byte[Ar.Length];
            for (var i = 0; i < Ar.Length; i++)
            {
                Res[i] = Ar[Ar.Length - (1 + i)];
            }
            return Res;
        }

        public static byte[] NumbToByte(long Numb, int CountByte)
        {
            byte[] Byte = new byte[CountByte];

            int i = 1;
            int index = 0;
            while (true)
            {
                Byte[index] += (byte)((Numb % 2) * i);
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
                        Byte[index] += (byte)((Numb % 2) * i * 2);
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

        public static byte[] NumbToByte(int Numb, int CountByte)
        {
            byte[] Byte = new byte[CountByte];

            int i = 1;
            int index = 0;
            while (true)
            {
                Byte[index] += (byte)((Numb % 2) * i);
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
                        Byte[index] += (byte)((Numb % 2) * i * 2);
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

        public static byte[] StringToByte(string s)
        {
            byte[] ba = new byte[s.Length];
            for (int i = 0; i < s.Length; i++)
            {
                ba[i] = (byte)s[i];
            }
            return ba;
        }

        public static byte[] HexToByte(string h)
        {
            string Ar16 = "0123456789ABCDEF";

            byte[] H = new byte[h.Length / 2];

            for (int i = 0; i < h.Length; i += 2)
            {
                H[i / 2] += (byte)(Ar16.IndexOf(h[i]) * 16 + Ar16.IndexOf(h[i + 1]));
            }
            return H;
        }
    }
}
