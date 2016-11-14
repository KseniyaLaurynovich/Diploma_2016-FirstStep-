using System;
using System.IO;

namespace BusinesServices.Helpers
{
    public class FolderHelper
    {
        public static string GetTempFolderPath()
        {
            var path = Path.GetTempPath();
            var folder = Guid.NewGuid().ToString();
            return Path.Combine(path, folder);
        }

        public static void CopyDirectory(string source, string destination)
        {
            foreach (string dirPath in Directory.GetDirectories(source, "*",
                        SearchOption.AllDirectories))
                Directory.CreateDirectory(dirPath.Replace(source, destination));

            foreach (string newPath in Directory.GetFiles(source, "*.*",
                SearchOption.AllDirectories))
                File.Copy(newPath, newPath.Replace(source, destination), true);
        }
    }
}
