using Base58Check;
using Credtis_Api_Connect.Model;
using NodeApi_4_3;
using System;
using System.Collections.Generic;
using System.Linq;
using Thrift.Protocol;
using Thrift.Transport;
using static NodeApi_4_3.API;
using static Credtis_Api_Connect.Model.Urilite;
using Thrift.Collections;

namespace Credtis_Api_Connect.Thrift.Version._4_3
{
    public class Work_4_3 : IApiWork
    {
        public readonly Client _connect;
        private readonly TSocket _socket;

        public Work_4_3(string Ip, int Port, int Time)
        {
            _socket = new TSocket(Ip, Port, Time);
            var _TBinProt = new TBinaryProtocol(_socket);
            _connect = new Client(_TBinProt);
            _socket.Open();
        }

        public TransactionsGetResult BcHistory(byte[] PublicKey, int Page, int Size)
        {
            return _connect.TransactionsGet(PublicKey, Page * Size - Size, Size);
        }

        public List<API_History> СonvertedHistory(byte[] PublicKey, int Page = 1, int Size = 100)
        {
            TransactionsGetResult Transactions = BcHistory(PublicKey, Page, Size);
            if (Transactions.Status.Code > 0)
            {
                throw new Exception(Transactions.Status.Message);
            }

            return Transactions.Transactions.Select(m => (API_History)new API_History_4_3(m)).ToList();
        }

        public class API_Variant_4_3 : API_Variant
        {
            public API_Variant_4_3(Variant V)
            {
                V_null = V.V_null;
                V_void = V.V_void;
                 V_boolean = V.V_boolean;
                V_byte = (byte)V.V_byte;
                V_short = V.V_short;
                V_int = V.V_int;
                V_long = V.V_long;
                V_float = V.V_float;
                V_double = V.V_double;
                V_string = V.V_string;
                V_array = V.V_array?.Select(m => (API_Variant)new API_Variant_4_3(m)).ToList();
                V_list = V.V_list?.Select(m => (API_Variant)new API_Variant_4_3(m)).ToList();
                V_big_decimal = V.V_big_decimal;
                V_byte_array = V.V_byte_array;
                if (V.__isset.v_amount)
                {
                    V_amount = BcToDouble(V.V_amount);
                }
                if (V.__isset.v_object)
                {
                    V_object = new V_Object_4_3(V.V_object);
                }
                if (V.__isset.v_map)
                {
                    V_map = new Dictionary<API_Variant, API_Variant>();
                    foreach (KeyValuePair<Variant, Variant> m in V.V_map)
                    {
                        V_map.Add(new API_Variant_4_3(m.Key), new API_Variant_4_3(m.Value));
                    }
                }
                if (V.__isset.v_set)
                {
                    V_set = new THashSet<API_Variant>();
                    foreach (Variant i in V.V_set)
                    {
                        V_set.Add(new API_Variant_4_3(i));
                    }
                }

            }

            public class V_Object_4_3 : V_Object
            {
                public V_Object_4_3(@object o)
                {
                    NameClass = o.NameClass;
                    Instance = o.Instance;
                }
            }

        }

        public List<WalletAllBalance> Balance(byte[] PublicKey)
        {
            List<WalletAllBalance> Res = new List<WalletAllBalance>();

            WalletBalanceGetResult CS_Bal = CS_Balance(PublicKey);
            if (CS_Bal.Status.Code > 0) throw new Exception(CS_Bal.Status.Message);

            TokenBalancesResult Token_Balance = TokenBalance(PublicKey);
            if (Token_Balance.Status.Code > 0)throw new Exception(Token_Balance.Status.Message);

            Res.Add(WalletAllBalance.Create(BcToDouble(CS_Bal.Balance)));

            foreach (TokenBalance item in Token_Balance.Balances)
            {

                //Delete trycatch block
                try
                {
                    Res.Add(WalletAllBalance.Create(
                        Convert.ToDouble(item.Balance),
                        Base58CheckEncoding.EncodePlain(item.Token),
                        item.Code,
                        item.Name)
                    );
                }
                catch (Exception)
                {
                    Console.WriteLine("");
                }
            }

            return Res;
        }

        public WalletBalanceGetResult CS_Balance(byte[] PublicKey)
        {
            return _connect.WalletBalanceGet(PublicKey);
        }

        public TokenBalancesResult TokenBalance(byte[] PublicKey)
        {
            return _connect.TokenBalancesGet(PublicKey);
        }

        public byte[] CreatePervStr(Transaction t)
        {
            if (t == null)
            {
                throw new Exception("Transaction is not be empty");
            }

            byte[] pba = NumbToByte(t.Id, 6);
            ConcatByteAr(ref pba, t.Source);
            ConcatByteAr(ref pba, t.Target);
            ConcatByteAr(ref pba, BitConverter.GetBytes(t.Amount.Integral));
            ConcatByteAr(ref pba, BitConverter.GetBytes(t.Amount.Fraction));

            ConcatByteAr(ref pba, BitConverter.GetBytes(t.Fee.Commission));
            ConcatByteAr(ref pba, new byte[1] { (byte)t.Currency });

            if (t.SmartContract != null)
            {
                ConcatByteAr(ref pba, new byte[1] { 1 });

                byte[] uf = new byte[3] { 11, 0, 1 };

                if (t.SmartContract.Method == null)
                {
                    ConcatByteAr(ref uf, new byte[4]);
                }
                else
                {
                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.Method.Length)));
                    ConcatByteAr(ref uf, StringToByte(t.SmartContract.Method));
                }


                if (t.SmartContract.Params == null)
                {
                    ConcatByteAr(ref uf, new byte[8] { 15, 0, 2, 12, 0, 0, 0, 0 });
                }
                else
                {
                    ConcatByteAr(ref uf, new byte[4] { 15, 0, 2, 12 });
                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.Params.Count)));

                    foreach (Variant i in t.SmartContract.Params)
                    {
                        if (i.__isset.v_string)
                        {
                            ConcatByteAr(ref uf, new byte[3] { 11, 0, 17 });
                            ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.V_string.Length)));
                            ConcatByteAr(ref uf, StringToByte(i.V_string));
                            ConcatByteAr(ref uf, new byte[1]);
                        }
                        else if (i.__isset.v_double)
                        {
                            ConcatByteAr(ref uf, new byte[3] { 4, 0, 15 });
                            ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.V_double)));
                            ConcatByteAr(ref uf, new byte[1]);
                        }
                        else if (i.__isset.v_int)
                        {
                            ConcatByteAr(ref uf, new byte[3] { 8, 0, 9 });
                            ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.V_int)));
                            ConcatByteAr(ref uf, new byte[1]);
                        }
                        else if (i.__isset.v_boolean)
                        {
                            ConcatByteAr(ref uf, new byte[5] { 2, 0, 3, 0, 0 });
                            if (i.V_boolean)
                            {
                                uf[uf.Length - 2] = 1;
                            }
                        }
                    }
                }

                if (t.SmartContract.UsedContracts == null)
                {
                    ConcatByteAr(ref uf, new byte[8] { 15, 0, 3, 11, 0, 0, 0, 0 });
                }
                else
                {
                    ConcatByteAr(ref uf, new byte[4] { 15, 0, 3, 11 });
                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.UsedContracts.Count)));
                    foreach (byte[] i in t.SmartContract.UsedContracts)
                    {
                        ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.Length)));
                        ConcatByteAr(ref uf, i);
                    }
                }

                ConcatByteAr(ref uf, new byte[4] { 2, 0, 4, 0 });
                if (t.SmartContract.ForgetNewState)
                {
                    uf[uf.Length - 1] = 1;
                }

                if (t.SmartContract.SmartContractDeploy != null)
                {
                    ConcatByteAr(ref uf, new byte[6] { 12, 0, 5, 11, 0, 1 });

                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.SmartContractDeploy.SourceCode.Length)));
                    ConcatByteAr(ref uf, StringToByte(t.SmartContract.SmartContractDeploy.SourceCode));

                    ConcatByteAr(ref uf, new byte[4] { 15, 0, 2, 12 });

                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.SmartContractDeploy.ByteCodeObjects.Count)));
                    foreach (ByteCodeObject i in t.SmartContract.SmartContractDeploy.ByteCodeObjects)
                    {
                        ConcatByteAr(ref uf, new byte[3] { 11, 0, 1 });
                        ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.Name.Length)));
                        ConcatByteAr(ref uf, StringToByte(i.Name));

                        ConcatByteAr(ref uf, new byte[3] { 11, 0, 2 });
                        ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.ByteCode.Length)));
                        ConcatByteAr(ref uf, i.ByteCode);
                        ConcatByteAr(ref uf, new byte[1]);
                    }
                    ConcatByteAr(ref uf, new byte[15] { 11, 0, 3, 0, 0, 0, 0, 8, 0, 4, 0, 0, 0, 0, 0 });
                }

                ConcatByteAr(ref uf, new byte[3] { 6, 0, 6 });
                ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.SmartContract.Version)));



                ConcatByteAr(ref uf, new byte[1]);
                ConcatByteAr(ref pba, NumbToByte(uf.Length, 4));
                ConcatByteAr(ref pba, uf);
            }
            else if (t.UserFields != null)
            {
                ConcatByteAr(ref pba, new byte[1] { 1 });
                ConcatByteAr(ref pba, BitConverter.GetBytes(t.UserFields.Length));
                ConcatByteAr(ref pba, t.UserFields);
            }
            else if (t.UsedContracts != null)
            {
                ConcatByteAr(ref pba, new byte[1] { 1 });

                byte[] uf = new byte[27] { 11, 0, 1, 0, 0, 0, 0, 15, 0, 2, 12, 0, 0, 0, 0, 15, 0, 3, 11, 0, 0, 0, 0, 15, 0, 3, 11 };

                ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(t.UsedContracts.Count)));
                foreach (byte[] i in t.UsedContracts)
                {
                    ConcatByteAr(ref uf, ReverceByteAr(BitConverter.GetBytes(i.Length)));
                    ConcatByteAr(ref uf, i);
                }
                ConcatByteAr(ref uf, new byte[5] { 2, 0, 4, 0, 1 });

                ConcatByteAr(ref pba, NumbToByte(uf.Length, 4));
                ConcatByteAr(ref pba, uf);
            }
            else
            {
                ConcatByteAr(ref pba, new byte[1]);
            }

            return pba;
        }

        public byte[] SignTransaction(byte[] PrivateKey, byte[] Message)
        {
            if (PrivateKey == null)
            {
                throw new Exception("PrivateKey is not be empty");
            }
            if (Message == null)
            {
                throw new Exception("Message is not be empty");
            }

            Rebex.Security.Cryptography.Ed25519 o = new Rebex.Security.Cryptography.Ed25519();
            o.FromPrivateKey(PrivateKey);
            return o.SignMessage(Message);
        }

        public Transaction CreateTransaction(CreateTransactionModel model)
        {
            if (model.Source.Length != 32)
            {
                throw new Exception("The length of the Source is not equal to 32");
            }

            WalletDataGetResult WalletData = _connect.WalletDataGet(model.Source);

            if (WalletData.Status.Code > 0)
            {
                throw new Exception(WalletData.Status.Message);
            }

            Transaction Res = new Transaction
            {
                Id = WalletData.WalletData.LastTransactionId + 1,
                Source = model.Source,
                Amount = AmountConvert(model.Amount),
                Fee = AmountCommissionEncode(model.Fee),
                UserFields = model.UserData
            };

            if (model.SmartContract.Code == null)
            {
                if (model.Target.Length != 32)
                {
                    throw new Exception("The length of the Target is not equal to 32");
                }
                Res.Target = model.Target;
            }
            else
            {
                Res.SmartContract = new SmartContractInvocation();

                byte[] ByteC = Res.Source;
                ConcatByteAr(ref ByteC, NumbToByte(Res.Id, 6));
                SmartContractCompileResult ByteCodes = _connect.SmartContractCompile(model.SmartContract.Code);
                if (ByteCodes.Status.Code > 0)
                {
                    throw new Exception(ByteCodes.Status.Message);
                }
                foreach (ByteCodeObject item in ByteCodes.ByteCodeObjects)
                {
                    ConcatByteAr(ref ByteC, item.ByteCode);
                }
                Res.Target = Blake2s.Blake2S.ComputeHash(ByteC);

                Res.SmartContract.SmartContractDeploy = new SmartContractDeploy
                {
                    SourceCode = model.SmartContract.Code,
                    ByteCodeObjects = ByteCodes.ByteCodeObjects
                };
            }

            if (model.SmartContract.Method != null)
            {
                Res.SmartContract = new SmartContractInvocation
                {
                    Method = model.SmartContract.Method,
                    Params = new List<Variant>()
                };

                if (model.SmartContract.Params != null)
                {
                    foreach (API_Variant i in model.SmartContract.Params)
                    {
                        Res.SmartContract.Params.Add(VariantConvert(i));
                    }
                }
            }

            if (Res.SmartContract != null)
            {
                Res.SmartContract.ForgetNewState = model.SmartContract.ForgetNewState;
            }

            if (model.UsedContracts != null)
            {
                Res.UsedContracts = new List<byte[]>();
                foreach (string i in model.UsedContracts)
                {
                    Res.UsedContracts.Add(Base58CheckEncoding.DecodePlain(i));
                }
            }
            return Res;
        }

        public API_TransactionFlowResult SendTransaction(CreateTransactionModel model)
        {
            Transaction T = CreateTransaction(model);
            T.Currency = 1;
            TransactionFlowResult Res = _connect.TransactionFlow(T);
            if (Res.Status.Code > 0)
            {
                throw new Exception(Res.Status.Message);
            }
            return new API_TransactionFlowResult_4_3(Res);
        }

        public API_TransactionFlowResult SendTransaction(CreateTransactionModel model, byte[] PrivateKey)
        {
            Transaction T = CreateTransaction(model);
            T.Currency = 1;
            T.Signature = SignTransaction(PrivateKey, CreatePervStr(T));
            TransactionFlowResult Res = _connect.TransactionFlow(T);
            if (Res.Status.Code > 0)
            {
                throw new Exception(Res.Status.Message);
            }
            return new API_TransactionFlowResult_4_3(Res);
        }

        public API_TransactionFlowResult  SendTransaction(CreateTransactionModel model, string Sign)
        {
            Transaction T = CreateTransaction(model);
            T.Signature = HexToByte(Sign);
            T.Currency = 1;
            TransactionFlowResult Res = _connect.TransactionFlow(T);
            if (Res.Status.Code > 0)
            {
                throw new Exception(Res.Status.Message);
            }
            return new API_TransactionFlowResult_4_3(Res);
        }

        public T SendTransaction<T>(CreateTransactionModel model, byte[] PrivateKey) where T : CreateTransactionModel
        {
            Transaction t = CreateTransaction(model);
            t.Currency = 1;
            t.Signature = SignTransaction(PrivateKey, CreatePervStr(t));
            TransactionFlowResult Res = _connect.TransactionFlow(t);
            if (Res.Status.Code > 0)
            {
                throw new Exception(Res.Status.Message);
            }
            model.Target = t.Target;

            return (T)model;
        }

        public byte[] GetSignature(CreateTransactionModel model)
        {
            Transaction T = CreateTransaction(model);
            T.Currency = 1;
            return CreatePervStr(T);
        }


        public List<API_SmartContractInfo> SmartContract(byte[] Key)
        {
            SmartContractDataResult Smart = _connect.SmartContractDataGet(Key);

            if (Smart.Status.Code > 0) throw new Exception(Smart.Status.Message);

            return Smart.Methods?.Select(m => (API_SmartContractInfo)new API_SmartContractInfo_4_3(m)).ToList();
        }

        public List<API_TokenTransfer> TokenTransferTransaction(byte[] Token, byte[] Wallet, int Page, int Limit)
        {
            if (Page < 1 || Limit < 1)
                throw new Exception("TokenTransfer: Page or limit must be greater than zero");

            TokenTransfersResult tr = _connect.TokenWalletTransfersGet(Token, Wallet, Page * Limit - Limit, Limit);
            if (tr.Status.Code > 0)
                throw new Exception($"TokenTransfer: {tr.Status.Message}");

            return tr.Transfers.Select(m => (API_TokenTransfer)new API_TokenTransfer_4_3(m)).ToList();
        }

        #region Model

        public class API_TransactionFlowResult_4_3 : API_TransactionFlowResult
        {
            public API_TransactionFlowResult_4_3(TransactionFlowResult tfr)
            {
                Status = new API_APIResponse_4_3(tfr.Status);
                if (tfr.__isset.smart_contract_result)
                {
                    Smart_contract_result = new API_Variant_4_3(tfr.Smart_contract_result);
                }
            }
        }

        public class API_APIResponse_4_3 : API_APIResponse
        {
            public API_APIResponse_4_3(APIResponse ar)
            {
                Code = ar.Code;
                Message = ar.Message;
            }
        }

        public class API_TokenTransfer_4_3 : API_TokenTransfer
        {
            public API_TokenTransfer_4_3(TokenTransfer tt)
            {
                Token = Base58CheckEncoding.EncodePlain(tt.Token);
                Code = tt.Code;
                Sender = Base58CheckEncoding.EncodePlain(tt.Sender);
                Receiver = Base58CheckEncoding.EncodePlain(tt.Receiver);
                Amount = tt.Amount;
                Initiator = Base58CheckEncoding.EncodePlain(tt.Initiator);
                Transaction = ConvertTransactionId(tt.Transaction);
                Time = tt.Time;
            }
        }


        public class API_SmartContractInfo_4_3 : API_SmartContractInfo
        {
            public API_SmartContractInfo_4_3(SmartContractMethod s)
            {
                ReturnType = s.ReturnType;
                Name = s.Name;
                Arguments = s.Arguments?.Select(m => (API_SmartArgument)new API_SmartArgument_4_3(m)).ToList();
            }
        }

        public class API_SmartArgument_4_3 : API_SmartArgument
        {
            public API_SmartArgument_4_3(SmartContractMethodArgument a)
            {
                Name = a.Name;
                Type = a.Type;
            }
        }

        public class API_History_4_3 : API_History
        {

            public API_History_4_3(SealedTransaction T)
            {
                id = ConvertTransactionId(T.Id);
                source = Base58CheckEncoding.EncodePlain(T.Trxn.Source);
                target = Base58CheckEncoding.EncodePlain(T.Trxn.Target);
                amount = BcToDouble(T.Trxn.Amount);
                fee = BcFeeConvert(T.Trxn.Fee.Commission);
                timeCreation = new DateTime(T.Trxn.TimeCreation);
                userFields = T.Trxn.UserFields;
                type = (API_TransactionType)T.Trxn.Type;

                if (T.Trxn.ExtraFee != null)
                {
                    extraFee = T.Trxn.ExtraFee.Select(m => (API_ExtraFee)new API_ExtraFee_4_3(m)).ToList();
                }

                if (T.Trxn.SmartContract != null)
                {
                    smartContract = new API_SmartContract_4_3(T.Trxn.SmartContract);
                }

                if (T.Trxn.SmartInfo != null)
                {
                    smartInfo = new API_SmartTransInfo_4_3(T.Trxn.SmartInfo);
                }
            }
        }

        public class API_TokenDeployTransInfo_4_3 : API_TokenDeployTransInfo
        {
            public API_TokenDeployTransInfo_4_3(TokenDeployTransInfo I)
            {
                Name = I.Name;
                Code = I.Code;
                Standart = I.TokenStandard;
                State = (API_SmartOperationState)I.State;
                StateTransaction = ConvertTransactionId(I.StateTransaction);
            }
        }

        public class API_TokenTransferTransInfo_4_3 : API_TokenTransferTransInfo
        {
            public API_TokenTransferTransInfo_4_3(TokenTransferTransInfo I)
            {
                Code = I.Code;
                Sender = Base58CheckEncoding.EncodePlain(I.Sender);
                Receiver = Base58CheckEncoding.EncodePlain(I.Receiver);
                Amount = I.Amount;
                State = (API_SmartOperationState)I.State;
                StateTransaction = ConvertTransactionId(I.StateTransaction);
                TransferSuccess = I.TransferSuccess;
            }
        }

        public class API_SmartDeployTransInfo_4_3 : API_SmartDeployTransInfo
        {
            public API_SmartDeployTransInfo_4_3(SmartDeployTransInfo I)
            {
                State = (API_SmartOperationState)I.State;
                StateTransaction = ConvertTransactionId(I.StateTransaction);
            }
        }

        public class API_SmartExecutionTransInfo_4_3 : API_SmartExecutionTransInfo
        {
            public API_SmartExecutionTransInfo_4_3(SmartExecutionTransInfo I)
            {
                Method = I.Method;
                Params = I.Params?.Select(m => (API_Variant)new API_Variant_4_3(m)).ToList();
                State = (API_SmartOperationState)I.State;
                StateTransaction = ConvertTransactionId(I.StateTransaction);
            }
        }

        public class API_SmartState_4_3 : API_SmartState
        {
            public API_SmartState_4_3(SmartStateTransInfo I)
            {
                Success = I.Success;
                ExecutionFee = BcToDouble(I.ExecutionFee);
                ReturnValue = new API_Variant_4_3(I.ReturnValue);
                StartTransaction = ConvertTransactionId(I.StartTransaction);
            }
        }

        public class API_SmartTransInfo_4_3 : API_SmartTransInfo
        {
            public API_SmartTransInfo_4_3(SmartTransInfo m)
            {
                if (m.__isset.v_tokenDeploy)
                {
                    TokenDeploy = new API_TokenDeployTransInfo_4_3(m.V_tokenDeploy);
                }
                if (m.__isset.v_tokenTransfer)
                {
                    TokenTransfer = new API_TokenTransferTransInfo_4_3(m.V_tokenTransfer);
                }
                if (m.__isset.v_tokenDeploy)
                {
                    SmartDeploy = new API_SmartDeployTransInfo_4_3(m.V_smartDeploy);
                }
                if (m.__isset.v_smartExecution)
                {
                    SmartExecution = new API_SmartExecutionTransInfo_4_3(m.V_smartExecution);
                }
                if (m.__isset.v_smartState)
                {
                    SmartState = new API_SmartState_4_3(m.V_smartState);
                }
            }
        }

        public class API_SmartContract_4_3 : API_SmartContract
        {
            public API_SmartContract_4_3(SmartContractInvocation S)
            {
                Method = S.Method;
                UsedContracts = S.UsedContracts;
                ForgetNewState = S.ForgetNewState;
                Params = S.Params?.Select(m => (API_Variant)new API_Variant_4_3(m)).ToList();
                if (S.__isset.smartContractDeploy)
                {
                    SmartContractDeploy = new API_SmartContractDeploy_4_3(S.SmartContractDeploy);
                }
            }
        }

        public class API_SmartContractDeploy_4_3 : API_SmartContractDeploy
        {
            public API_SmartContractDeploy_4_3(SmartContractDeploy D)
            {
                SourceCode = D.SourceCode;
                ByteCodeObjects = D.ByteCodeObjects.Select(m => (API_ByteCodeObject)new API_ByteCodeObject_4_3(m)).ToList();
                TokenStandart = D.TokenStandard;
            }
        }

        public class API_ByteCodeObject_4_3 : API_ByteCodeObject
        {
            public API_ByteCodeObject_4_3(ByteCodeObject B)
            {
                Name = B.Name;
                ByteCode = B.ByteCode;
            }
        }

        public class API_ExtraFee_4_3 : API_ExtraFee
        {
            public API_ExtraFee_4_3() { }

            public API_ExtraFee_4_3(ExtraFee f)
            {
                sum = BcToDouble(f.Sum);
                comment = f.Comment;
                transactionId = ConvertTransactionId(f.TransactionId);
            }
        }
        #endregion

        #region Function

        private static decimal BcToDouble(Amount a)
        {
            return a.Integral +  decimal.Multiply(a.Fraction, 0.000000000000000001M);
        }

        private static string ConvertTransactionId(TransactionId T)
        {
            return $"{T.PoolSeq}.{T.Index + 1}";
        }

        private static Variant VariantConvert(API_Variant av)
        {
            Variant vr = new Variant();

            if (av.V_null != null)
            {
                vr.V_null = av.V_null;
            }
            if (av.V_string != null)
            {
                vr.V_string = av.V_string;
            }
            if (av.V_int.HasValue)
            {
                vr.V_int = (int)av.V_int;
            }
            if (av.V_boolean.HasValue)
            {
                vr.V_boolean = (bool)av.V_boolean;
            }

            //Variant vr = new Variant
            //    {
            //        V_null = av.V_null,
            //        V_void = av.V_void,
            //        V_boolean = av.V_boolean,
            //        V_byte = (sbyte)av.V_byte,
            //        V_short = av.V_short,
            //        V_int = av.V_int,
            //        V_long = av.V_long,
            //        V_float = av.V_float,
            //        V_double = av.V_double,
            //        V_string = av.V_string,
            //        V_big_decimal = av.V_big_decimal,
            //        V_byte_array = av.V_byte_array
            //    };
            //    if(av.V_null == null)    


            //    if (av.V_amount != null)
            //    {
            //        vr.V_amount = AmountConvert(av.V_amount);
            //    }

            //    if (av.V_map != null)
            //    {
            //        vr.V_map = new Dictionary<Variant, Variant>();
            //        foreach (KeyValuePair<API_Variant, API_Variant> i in av.V_map)
            //        {
            //            vr.V_map.Add(VariantConvert(i.Key), VariantConvert(i.Value));
            //        }
            //    }

            return vr;
        }

        private static Amount AmountConvert(double a)
        {
            Amount Res = new Amount
            {
                Integral = (int)a
            };
            if (Res.Integral == 0)
            {
                Res.Fraction = System.Convert.ToInt64(a * Math.Pow(10, 18));
            }
            else
            {
                Res.Fraction = System.Convert.ToInt64((Res.Integral - a) * Math.Pow(10, 18));
            }
            return Res;
        }

        private static Amount AmountConvert(double? a)
        {
            return new Amount
            {
                Integral = (int)a,
                Fraction = System.Convert.ToInt64(((int)a - a) * Math.Pow(10, 18))
            };
        }

        private static AmountCommission AmountCommissionEncode(double f)
        {
            f = Math.Abs(f);
            double exp = f == 0 ? 0 : Math.Log10(f);
            int e = Convert.ToInt32(exp >= 0 ? exp + 0.5 : exp - 0.5);
            f /= Math.Pow(10, e);
            if (f >= 1)
            {
                f *= 0.1;
                ++e;
            }
            return new AmountCommission { Commission = (short)((e + 18) << 10 | ((int)(f * 1024) == 1024 ? 1023 : (int)(f * 1024))) };
        }
        #endregion

        public void Dispose()
        {
            _connect.Dispose();
        }
    }
}