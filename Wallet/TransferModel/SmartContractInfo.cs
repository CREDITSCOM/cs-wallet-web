using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wallet.TransferModel
{
    public class SmartContractInfo
    {
        public List<SmartArgument> Arguments { get; set; }

        public string ReturnType { get; set; }

        public string Name { get; set; }
    }

    public class SmartArgument
    {
        public string Name { get; set; }

        public string Type { get; set; }
    }
}