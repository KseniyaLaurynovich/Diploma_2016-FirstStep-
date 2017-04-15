using System.IO;
using System.Linq;
using CmdWrapper;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using System.Configuration;
using CmdWrapper.Constants;

namespace JI.Managers.Tools
{
    internal class CppCompiler : ICompilator
    {
        private const string CppCompilerConfigKey = "cpp:compiler";
        public const string ExeName = "Argv.exe";

        private string TempDirectory(string projectPath) => $"{projectPath}/Temp";

        public ServiceResult<string> Compile(string projectPath)
        {
            var path = TempDirectory(projectPath);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var sourceFiles = Directory.GetFiles($"{projectPath}/workspace").Where(f => f.EndsWith(".cpp")).ToArray();
            var compilerPath = ConfigurationManager.AppSettings[CppCompilerConfigKey];

            var cmd = new Cmd();
            var arguments = GetArgumentsString($"{path}/{ExeName}", sourceFiles);
            var result = cmd.Run($"{projectPath}/workspace", arguments, compilerPath + "/g++.exe");

            return result.Status == ExecutionStatus.OK
                ? ServiceResult<string>.Success(result.Output) 
                : ServiceResult<string>.Failed(result.Errors);
        }

        protected string GetArgumentsString(
            string outputFileName, string[] inputFiles, string[] inputLibraries = null)
        {
            string add = string.Empty;
            if (inputLibraries != null && inputLibraries.Any())
            {
                add = $"-l {string.Join(" ", inputLibraries)}";
            }

            return $"-o {outputFileName} {string.Join(" ", inputFiles)} {add}";
        }
    }
}
