using Db.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Db.DbTable
{
    public class DbUsers
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public DateTime DateCreate { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
        public string AuthorizationKey { get; set; }
        public DateTime LastAuthorization { get; set; }

        public static void Create(AppDb context, DbUsers nu)
        {
            DbUsers u = context.Users.FirstOrDefault(m => m.Login == nu.Login);
            if (u == null)
            {
                nu.DateCreate = DateTime.Now;
                nu.LastAuthorization = DateTime.Now;
                nu.IsActive = true;
                nu.IsDelete = false;

                context.Users.Add(nu);
            }
            else
            {
                throw new Exception("Login busy");
            }
        }

        public static string Authorization(AppDb context, string Login, string Password)
        {
            DbUsers u = context.Users.FirstOrDefault(m => m.Login == Login && m.Password == Password);
            if (u == null)
            {
                throw new Exception("Wrong login or password");
            }
            else
            {
                u.LastAuthorization = DateTime.Now;
                do
                {
                    u.AuthorizationKey = Utility.Rand(32);
                    DbUsers _u = context.Users.FirstOrDefault(m => m.AuthorizationKey == u.AuthorizationKey);
                    if (_u == null)
                    {
                        break;
                    }
                }
                while (true);
                return u.AuthorizationKey;
            }
        }

        public static DbUsers One(AppDb context, string AuthorizationKey)
        {
            return context.Users.FirstOrDefault(m => m.AuthorizationKey == AuthorizationKey);
        }
    }
}
