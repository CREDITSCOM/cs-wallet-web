using Db.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Db.DbTable
{
    public enum ENetWork : byte
    {
        CreditsNetWork,
        TestNet,
        DapsNet
    }

    public class IpNet
    {
        public int Id { get; set; }
        public string IdStr { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int NetWork { get; set; }
        public string Ip { get; set; }
        public int Aport { get; set; }
        public int Tport { get; set; }

        public static void Create(AppDb context, IpNet i)
        {
            i.IdStr = Utility.Rand(16);
            i.DateCreate = DateTime.Now;
            i.DateUpdate = DateTime.Now;
            context.IpNets.Add(i);
        }

        public static void Update(IpNet o, IpNet n)
        {
            o.DateUpdate = DateTime.Now;
            o.NetWork = n.NetWork;
            o.Ip = n.Ip;
            o.Aport = n.Aport;
            o.Tport = n.Tport;
        }

        public static IpNet One(AppDb context, string Id)
        {
            return context.IpNets.FirstOrDefault(m => m.IdStr == Id);
        }

        public static List<IpNet> All(AppDb context)
        {
            return context.IpNets.ToList();
        }
    }
}
