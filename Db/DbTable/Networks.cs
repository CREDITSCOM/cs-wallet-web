using Db.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Db.DbTable
{
    public class Networks
    {
        public int Id { get; set; }
        public string IdStr { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string MonitorLink { get; set; }

        public static void Add(AppDb context, Networks n)
        {
            do
            {
                n.IdStr = Utility.Rand(16);
                Networks o = context.Networks.FirstOrDefault(m => m.IdStr == n.IdStr);
                if (o == null) break;
            } while (true);
            n.DateCreate = DateTime.Now;
            n.DateUpdate = DateTime.Now;
            context.Networks.Add(n);
        }

        public static void Update(Networks o, Networks n)
        {
            o.DateUpdate = DateTime.Now;
            o.Name = n.Name;
            o.Title = n.Title;
            o.MonitorLink = n.MonitorLink;
        }

        public static Networks One(AppDb context, string id)
        {
            return context.Networks.FirstOrDefault(m => m.IdStr == id);
        }

        public static Networks OneByName(AppDb context, string Name)
        {
            return context.Networks.FirstOrDefault(m => m.Name == Name);
        }

        public static List<Networks> All(AppDb context)
        {
            return context.Networks.ToList();
        }
    }
}
