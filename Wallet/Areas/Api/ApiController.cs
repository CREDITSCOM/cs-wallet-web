using Api.Service;
using System.Web.Mvc;
using Wallet.Models;

namespace Wallet.Areas.Api
{
    public class ApiController : Controller
    {
        private string Net => RouteData.Values["network"].ToString();

        public IApiWork _api
        {
            get
            {
                switch (Net)
                {
                    case "Release_4_2":
                        return new ApiWork_4_2("");
                    case "Release_4_2_t":
                        return new ApiWork_4_2("");
                    case "Devs-Dapps-Testnet":
                        return new ApiWork_4_2("");
                    default:
                        return new ApiWork_4_2("");
                }
            }
        }

        public ActionResult Balance(string Id = "")
        {
            return Json(_api.Balance(Id),JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreatePervStr(TransactionCreateModel<string> model)
        {
            return Json(_api.CreatePervStr(model));
        }

        [HttpPost]
        public ActionResult UnsafeTransaction(TransactionCreateModel<string> model)
        {
            return Json(_api.UnsafeTransaction(model));
        }

        [HttpPost]
        public ActionResult Transaction(PervStrModel model)
        {
            return Json(_api.Send(model));
        }

        public ActionResult SmartContract(string Id)
        {
            return Json(_api.SmartContract(Id), JsonRequestBehavior.AllowGet);
        }
    }
}