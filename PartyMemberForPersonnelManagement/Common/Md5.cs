using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Md5
    {
        public static string GetMd5Word(string word, string value)
        {
            word += value;
            MD5CryptoServiceProvider m = new MD5CryptoServiceProvider();
            byte[] MD5Source = System.Text.Encoding.UTF8.GetBytes(word);
            byte[] MD5Out = m.ComputeHash(MD5Source);
            return Convert.ToBase64String(MD5Out);
        }
    }
}