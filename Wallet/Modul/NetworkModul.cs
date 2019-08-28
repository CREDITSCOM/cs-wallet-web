using Db.Context;
using Db.DbTable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace Wallet.Modul
{
    public struct IpWork
    {
        public string ip;
        public int aport;
        public int tport;

        public IpWork(string Ip, int aPort, int tPort)
        {
            ip = Ip;
            aport = aPort;
            tport = tPort;
        }
    }

    public class NetworkModul : IHttpModule
    {
        public static Dictionary<int, int> LastIp { get; set; }
        static Timer _t;
        readonly long _i = 30000;
        private static Dictionary<int, List<IpWork>> _net = new Dictionary<int, List<IpWork>>();

        public NetworkModul()
        {
            LastIp = new Dictionary<int, int>();
        }

        public void Init(HttpApplication app)
        {
            _t = new Timer(new TimerCallback(UpdateNetWorkIp),null,0,_i);
            UpdateNet();
        }

        public static void UpdateNet()
        {
            using (AppDb context = AppDb.Create())
            {
                lock (LastIp)
                {
                    LastIp = new Dictionary<int, int>();
                    var n = Networks.All(context);
                    foreach (Networks i in n)
                    {
                        LastIp.Add(i.Id, 0);
                    }
                }
            }
        }

        private void UpdateNetWorkIp(object obj)
        {
            lock (_net)
            {
                _net.Clear();
                using (AppDb context = AppDb.Create())
                {
                    var nets = Networks.All(context);

                    foreach (Networks s in nets)
                    {
                        _net[s.Id] = new List<IpWork>();
                    }

                    List<IpNet> n = IpNet.All(context);

                    foreach (IpNet i in n)
                    {
                        _net[nets.Select(m => m.Id).FirstOrDefault(m => m == i.NetWork)].Add(new IpWork(i.Ip,i.Aport,i.Tport));
                    }
                }
            }
        }

        public static IpWork GetNet(int n)
        {

            lock (LastIp)
            { 
                ++LastIp[n];
                lock (_net) {
                    if (_net[n].Count == 0) throw new Exception("Ip node is not found");
                    if (LastIp[n] > _net[n].Count - 1) LastIp[n] = 0;
                    return _net[n][LastIp[n]];
                }
            }
        }

        public void Dispose()
        { }
    }
}