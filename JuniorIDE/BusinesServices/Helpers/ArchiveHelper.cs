using System.IO;
using Ionic.Zip;

namespace JI.Services.Helpers
{
    public static class ArchiveHelper
    {
        public static void UnZipCatalog(Stream stream, string zipName, string path)
        {
            using (var zip = ZipFile.Read(stream))
            {
                zip.ExtractAll(path);
            }
        }
    }
}
