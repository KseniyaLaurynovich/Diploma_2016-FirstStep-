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
            var outputFilePath = new FileInfo(ExePath(Guid.NewGuid()));

            if(!File.Exists(CppCompilerPath))
                throw new ConfigurationErrorsException("Cpp compiler not found");

            if (!Directory.Exists(outputFilePath.DirectoryName))
                Directory.CreateDirectory(outputFilePath.DirectoryName);

            var sourceFiles = GetFilesForCompilation(projectPath)
                .Select(fullPath => fullPath.GetRelativePath(projectPath));

            var cmd = new Cmd();
            
            var arguments = GetArgumentsString(outputFilePath.FullName, sourceFiles.ToArray());
            var result = cmd.Run(projectPath, arguments, CppCompilerPath);

            return result.Status == ExecutionStatus.OK
                ? ServiceResult<string>.Success(outputFilePath.FullName) 
                : ServiceResult<string>.Failed(result.Errors);
        }

        #region const

        protected string CppCompilerPath = $@"{ConfigurationManager.AppSettings["cpp:compiler"]}\g++.exe";

        protected readonly string[] ExcludeFolders =
            (ConfigurationManager.AppSettings["cpp:exclude"]??string.Empty).Split(',').Select(f => f.Trim()).ToArray();

        protected string[] FileExtens =
        {
            ".cpp"
        };

        protected string ExePath(Guid guid) => $@"D:\JuniorTemp\{ guid }\Argv.exe";

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
                    if(!ExcludeFolders.Contains(systemObj.Name))
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
