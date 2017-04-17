using System.IO;
using CmdWrapper;
using CmdWrapper.Constants;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;

namespace JI.Managers.Tools
{
    internal class TestExecutor : ITestExecutor
    {
        private string OutputFile(string workingDirectory) => $@"{workingDirectory}\output.txt";
        private readonly IFileEquatable _fileEquatable;


        public TestExecutor(IFileEquatable fileEquatable)
        {
            _fileEquatable = fileEquatable;
        }

        public ServiceResult Test(string programPath, string input, string output)
        {
            var fileInfo = new FileInfo(programPath);
            var cmd = new Cmd();

            var workingDirectory = fileInfo.DirectoryName;

            var runResult = cmd.Run(workingDirectory, "", fileInfo.FullName);

            if (runResult.Status == ExecutionStatus.OK)
            {
                var outputFile = OutputFile(workingDirectory);

                if (File.Exists(outputFile))
                {
                    return _fileEquatable.Equals(outputFile, output) 
                        ? ServiceResult.Success 
                        : ServiceResult.Failed("Output files don't match");

                    //TODO move to resources
                }

                //TODO move to resources
                return ServiceResult.Failed("No output file was found");
            }

            return ServiceResult.Failed(runResult.Errors);
        }
    }
}
