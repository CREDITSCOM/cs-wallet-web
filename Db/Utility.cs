using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Db
{
    public static class Utility
    {
        public static string Rand(int length, Random r)
        {
            string s = "QAZXSWEDCVFRTGBNHYUJMKIOLP1234567890plmokijnuhbygvtfcrdxeszawq";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < length; i++)
            {
                sb.Append(s[r.Next(0,s.Length)]);
            }
            return sb.ToString();
        }

        public static string Rand(int length)
        {
            return Rand(length, new Random());
        }
    }
}
