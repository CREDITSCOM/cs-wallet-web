using Api.Service;
using Base58Check;
using Credtis_Api_Connect;
using Credtis_Api_Connect.Model;
using Db.Context;
using Db.DbTable;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net;
using System.Threading;
using System.Web.Mvc;
using Wallet.Attribute;
using Wallet.Models;
using Wallet.Modul;

namespace Wallet.Areas.Api
{
    [ExceptionAttribute]
    public class ApiController : Controller
    {
        public ApiController()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
        }

        private string Net => RouteData.Values["network"].ToString();

        public Work _api
        {
            get
            {
                using (AppDb context = AppDb.Create())
                {
                    var n = Networks.OneByName(context, Net);
                    if (n == null) throw new Exception("Network is not found");

                    IpWork net = NetworkModul.GetNet(n.Id);
                    return new Work(net.ip, net.tport);
                }
            }
        }

        public ActionResult Balance(string Id = "")
        {
            Response.Headers.Add("content-type", "application/json");
            byte[] Key;
            try
            {
                Key = Base58CheckEncoding.DecodePlain(Id);
            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json("PublicKey is invalid", JsonRequestBehavior.AllowGet);
            }
            try
            {
                return Json(_api.Api.Balance(Key), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult CreatePervStr(TransactionCreateModel model)
        {
            Response.Headers.Add("content-type", "application/json");
            try
            {
                model.Priv = BitConverter.ToString(_api.Api.GetSignature(new CreateTransactionModel(model))).Replace("-", "");
                return Json(model);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Transaction(TransactionCreateModel model)
        {
            Response.Headers.Add("content-type", "application/json");
            try
            {
                return Json(_api.Api.SendTransaction(new CreateTransactionModel(model), model.Priv));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult NetWork()
        {
            Response.Headers.Add("content-type", "application/json");
            List<IpWork> nets = new List<IpWork>();

            using (AppDb context = AppDb.Create())
            {
                var n = Networks.OneByName(context, Net);
                if (n == null) throw new Exception("Network is not found");
                nets.Add(NetworkModul.GetNet(n.Id));
            }

            return Json(nets, JsonRequestBehavior.AllowGet);
        }

        [HttpOptions]
        public ActionResult UnsafeTransaction()
        {
            return Json("");
        }

        [HttpPost]
        public ActionResult UnsafeTransaction(TransactionCreateModel model)
        {
            if (model.Priv == null)
            {
                return Json(_api.Api.SendTransaction(new CreateTransactionModel(model)));
            }
            else
            {
                byte[] Private;
                try
                {
                    Private = Base58CheckEncoding.DecodePlain(model.Priv);
                }
                catch (Exception ex)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
                try
                {
                    return Json(_api.Api.SendTransaction(new CreateTransactionModel(model), Private));
                }
                catch (Exception ex)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult SmartContract(string Id)
        {
            byte[] Public;

            try
            {
                Public = Base58CheckEncoding.DecodePlain(Id);
            }
            catch (Exception)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json("PublicKey is invalid", JsonRequestBehavior.AllowGet);
            }

            try
            {
                return Json(_api.Api.SmartContract(Public), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}