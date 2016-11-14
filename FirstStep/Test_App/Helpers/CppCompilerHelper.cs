using System.Linq;

namespace Test_App
{
    public class CppCompilerHelper
    {
        public static string GetArgumentsString(
            string outputFileName, string[] inputFiles, string[] inputLibraries = null)
        {
            string add = string.Empty;
            if(inputLibraries != null && inputLibraries.Any())
            {
                add = $"-l {string.Join(" ", inputLibraries)}";
            }

            return $"-o {outputFileName} {string.Join(" ", inputFiles)} {add}";
        }
    }
}
