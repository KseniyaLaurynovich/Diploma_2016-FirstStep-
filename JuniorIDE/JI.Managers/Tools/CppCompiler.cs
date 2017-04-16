using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using CmdWrapper;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using CmdWrapper.Constants;
using JI.Managers.Business.Extensions;

namespace JI.Managers.Tools
{
    internal class CppCompiler : ICompilator
    {
        public ServiceResult<string> Compile(string projectPath)
        {
            var tempDirectory = TempDirectory(projectPath);

            if (!Directory.Exists(tempDirectory))
                Directory.CreateDirectory(tempDirectory);

            var sourceFiles = GetFilesForCompilation(WorkDirectory(projectPath))
                .Select(fullPath => fullPath.GetRelativePath(projectPath));

            var cmd = new Cmd();
            var outputFilePath = ExePath(projectPath).GetRelativePath(projectPath);
            var arguments = GetArgumentsString(outputFilePath, sourceFiles.ToArray());
            var result = cmd.Run(projectPath, arguments, CppCompilerPath);

            return result.Status == ExecutionStatus.OK
                ? ServiceResult<string>.Success(ExePath(projectPath)) 
                : ServiceResult<string>.Failed(result.Errors);
        }

        #region const

        protected string CppCompilerPath = $"{ConfigurationManager.AppSettings["cpp:compiler"]}\\g++.exe";

        protected string[] FileExtens =
        {
            ".cpp"
        };

        protected string ExePath = "Argv.exe";

        protected string WorkDirectory(string projectPath)
        {
            return $"{projectPath}\\workspace";
        }

        protected string TempDirectory(string projectPath)
        {
            return $"D:\\JuniorTemp\\{Guid.NewGuid()}\\Temp";
        }

        #endregion

        #region protected

        protected IEnumerable<string> GetFilesForCompilation(string relativePath)
        {
            var files = new List<string>();
            var workDirectory = Directory.CreateDirectory(relativePath);

            foreach (var systemObj in workDirectory.GetFileSystemInfos())
            {
                if (systemObj is FileInfo)
                {
                    if(FileExtens.Contains(systemObj.Extension))
                        files.Add(systemObj.FullName);
                }
                else
                {
                    files.AddRange(GetFilesForCompilation(systemObj.FullName));
                }
            }

            return files;
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

        #endregion
    }
}
