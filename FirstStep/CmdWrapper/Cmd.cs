using CmdWrapper.Contracts;
using CmdWrapper.Models;
using CmdWrapper.Variable;
using System.Diagnostics;
using System.IO;

namespace CmdWrapper
{
    public class Cmd
    {
        public IExecutionResult Run(string workingDirectory, string argumentsString, string programName)
        {
            var processStartInfo = 
                GetProcessStartInfo(programName, argumentsString, workingDirectory);

            using (var process = Process.Start(processStartInfo))
            {
                process.WaitForExit();
                return GetResult(process.StandardError, process.StandardOutput);
            }
        }

        #region Helpers

        private ProcessStartInfo GetProcessStartInfo(string fileName, string arguments, string workingDirectory)
        {
            return new ProcessStartInfo
            {
                WorkingDirectory = workingDirectory,
                WindowStyle = ProcessWindowStyle.Hidden,
                FileName = fileName,
                Arguments = arguments,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false
            };
        }

        private ExecutionResult GetResult(StreamReader errorStream, StreamReader outputStream)
        {
            var errors = errorStream.ReadToEnd();

            if (string.IsNullOrWhiteSpace(errors))
            {
                return new ExecutionResult
                {
                    Status = ExecutionStatus.OK,
                    Output = outputStream.ReadToEnd()
                };
            }

            return new ExecutionResult
            {
                Status = ExecutionStatus.Failed,
                Errors = new[] { errors }
            };
        }

        #endregion
    }
}
