using Api.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wallet.Attr;

namespace Wallet.Controllers
{
    [Culture("en")]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
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
    }
}

