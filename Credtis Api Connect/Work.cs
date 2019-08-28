using Credtis_Api_Connect.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Credtis_Api_Connect
{
    public enum NetWork : byte
    {
        CreditsNetwork,
        DevsDappsTestnet,
        testnet_r4_2
    }

    public enum ThriftVersion : byte
    {
        _4_3
    }

    public class Work : IDisposable
    {
        public readonly IApiWork Api;

        //private readonly Dictionary<NetWork, Credtis_Net> _net = new Dictionary<NetWork, Credtis_Net>
        //{
        //    { NetWork.CreditsNetwork, new Credtis_Net("161.156.96.26") },
        //    { NetWork.DevsDappsTestnet, new Credtis_Net("161.156.96.22") },
        //    { NetWork.testnet_r4_2, new Credtis_Net("89.111.33.169") }
        //};

        public Work(string Ip, int Port = 9090, int Time = 60000, ThriftVersion Version = ThriftVersion._4_3)
        {
            switch (Version)
            {
                case ThriftVersion._4_3:
                    Api = new Thrift.Version._4_3.Work_4_3(Ip,Port,Time);
                break;
            }
        }

        public void Dispose()
        {
            Api.Dispose();
        }
    }

}
