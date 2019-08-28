using Api.Service;
using NodeApi;
using System;
using System.Collections.Generic;
using Wallet.TransferModel;

namespace Wallet.Models
{
    public interface IIApiWork : IDisposable
    {
        ApiResult<BalanceCS> Balance(string Public);
        ApiResult<bool> Send(PervStrModel model);
        byte[] BitsToBytes(string Bits);
        int BitsToNumb(string Bits);
        FeeRes Fee(double val);
        string FractionToStr(long Fraction);
        ApiResult<List<SmartContractInfo>> SmartContract(string Key);
    }
}