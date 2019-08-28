using System;
using System.Web.Mvc;

namespace Wallet.Attribute
{
    public class ExceptionAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext exceptionContext)
        {
            exceptionContext.Result = new RedirectResult("/Content/ExceptionFound.html");
            exceptionContext.ExceptionHandled = true;
        }
    }
}