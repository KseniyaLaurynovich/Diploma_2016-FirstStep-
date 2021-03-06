﻿using CmdWrapper.Constants;

namespace CmdWrapper.Contracts
{
    public interface IExecutionResult
    {
        ExecutionStatus Status { get; set; }
        string[] Errors { get; set; }
        string Output { get; set; }
    }
}
