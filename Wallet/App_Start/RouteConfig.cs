using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Wallet
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            var constaints = new
            {
                lang = @"ha|es|fl|fil|vi|ru|ja|ar|en|de|ko|zh|um|ee|tr|pe|py|gf|hi|gh|ir|hu|gw|ua|bm|at|pa|de|ss|ec|in|cl|cs|bi|uy|gb|il|nf|mm|md|rs|co|be|pf|bv|by|ph|dm|ls|om|nz|ba|gt|af|tl|tj|mq|cr|cx|ng|va|mc|gl|cw|me|nr|sc|pg|se|wf|gu|kp|vc|zm|cz|ma|cm|bb|cd|tt|ag|sa|mp|li|km|it|re|pn|zw|nl|ci|gg|au|lc|tw|so|gr|fk|is|ki|nu|an|hk|sm|sd|mx|ve|hn|yt|to|tz|iq|gn|ro|bf|td|bh|ke|la|sx|pk|tm|si|gy|mo|ca|cf|mn|mt|gs|kh|bo|yu|eg|kw|dk|aq|do|st|er|pr|cc|mh|lb|tc|mf|bg|mw|fj|gq|kz|sh|br|tv|za|ar|ax|ch|ie|im|mz|hr|tf|th|bn|ug|fo|sz|pl|lt|lv|ps|rw|bj|cy|ye|bl|sb|cv|fr|dj|al|as|id|mk|ai|tg|et|lk|pt|qa|my|bq|ga|ni|vu|mv|ao|ws|bz|sn|jo|sy|bd|az|mg|ae|ms|fm|je|pw|sl|tn|ru|nc|sj|lr|ne|mu|uz|gm|gd|kg|aw|pm|kr|na|sk|jp|es|gi|ml|ck|bt|ly|np|gp|tk|mr|dz|cn|vn|sv|no|am|ad|kn|jm|bs|sg|ht|sr|ge|ky|vg|bw|cg|lu|fi"
            };

            routes.MapRoute(
                name: "DefaultLang",
                url: "{lang}/{action}/{id}",
                constraints: constaints,
                defaults: new { lang = "en", controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "Wallet.Controllers" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{action}/{id}",
                constraints: constaints,
                defaults: new { lang = "en", controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new string[] { "Wallet.Controllers" }
            );
        }
    }
}
