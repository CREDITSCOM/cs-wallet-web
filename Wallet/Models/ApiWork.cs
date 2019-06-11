using Api.Service;
using NodeApi;
using System;
using System.Collections.Generic;
using Wallet.TransferModel;

namespace Wallet.Models
{
    public interface IApiWork : IDisposable
    {
        ApiResult<BalanceCS> Balance(string Public);
        ApiResult<PervStrModel> CreatePervStr(TransactionCreateModel<string> model);
        ApiResult<object> UnsafeTransaction(TransactionCreateModel<string> model);
        ApiResult<bool> Send(PervStrModel model);
        byte[] BitsToBytes(string Bits);
        int BitsToNumb(string Bits);
        FeeRes Fee(double val);
        string FractionToStr(long Fraction);
        ApiResult<List<SmartContractInfo>> SmartContract(string Key);
    }
}