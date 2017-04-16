﻿using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IAutoTestedManager
    {
        ServiceResult<TestResult> Test(string userId, string taskId);
    }
}
