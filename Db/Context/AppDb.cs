using Db.DbTable;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Db.Context
{
    public class AppDb : DbContext
    {
        public AppDb() : base("")
        {
            Database.SetInitializer<AppDb>(new MigrateDatabaseToLatestVersion<AppDb, AppConfiguration>());
        }

        public static AppDb Create()
        {
            return new AppDb();
        }

        public DbSet<DbUsers> Users { get; set; }
        public DbSet<Networks> Networks { get; set; }
        public DbSet<IpNet> IpNets { get; set; }
    }

    public class AppConfiguration : DbMigrationsConfiguration<AppDb>
    {
        public AppConfiguration()
        {
            AutomaticMigrationDataLossAllowed = true;
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(AppDb context) { }
    }
}
