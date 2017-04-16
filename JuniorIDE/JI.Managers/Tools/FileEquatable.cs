using System.Security.Cryptography;
using System.Text;
using System.IO;
using JI.Managers.Contracts;

namespace JI.Managers.Tools
{
    internal class FileEquatable : IFileEquatable
    {
        public bool Equals(string file1, string file2)
        {
            var hash1 = GetFileHash(file1);
            var hash2 = GetFileHash(file2);

            return hash1.Equals(hash2);
        }

        #region protected

        protected string GetFileHash(string filename)
        {
            using (var hash = new SHA1Managed())
            {
                var clearBytes = File.ReadAllBytes(filename);
                var hashedBytes = hash.ComputeHash(clearBytes);
                return ConvertBytesToHex(hashedBytes);
            }
        }

        protected string ConvertBytesToHex(byte[] bytes)
        {
            var sb = new StringBuilder();

            foreach (var @byte in bytes)
            {
                sb.Append(@byte.ToString("x"));
            }
            return sb.ToString();
        }

        #endregion

    }
}
