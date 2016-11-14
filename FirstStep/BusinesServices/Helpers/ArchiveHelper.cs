using Ionic.Zip;
using System.IO;

namespace BusinesServices.Helpers
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
