namespace JI.Managers.Business.Extensions
{
    internal static class StringExtensions
    {
        public static string GetRelativePath(this string fullPath, string rootPath)
        {
            return fullPath
                .Replace(rootPath, string.Empty)
                .TrimStart('\\');
        }
    }
}
