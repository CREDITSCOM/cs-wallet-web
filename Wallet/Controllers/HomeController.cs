using Db;
using Db.Context;
using Db.DbTable;
using System;
using System.Web.Mvc;
using Wallet.Attr;
using Wallet.Modul;

namespace Wallet.Controllers
{
    [Culture("en")]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            using (AppDb context = AppDb.Create())
            {
                ViewBag.Networks = Networks.All(context);
            } 
            return View();
        }

        public ActionResult TestNet()
        {
            return View();
        }

        public ActionResult DappsNet()
        {
            return View();
        }

        public ActionResult JS()
        {
            return View();
        }
        public ActionResult CSW()
        {
            return View();
        }
    }
}

