using CmdWrapper.Constants;
using CmdWrapper.Contracts;

namespace CmdWrapper.Models
{
    internal class ExecutionResult : IExecutionResult
    {
        public ExecutionStatus Status { get; set; }
        public string[] Errors { get; set; }
        public string Output { get; set; }
    }
}
