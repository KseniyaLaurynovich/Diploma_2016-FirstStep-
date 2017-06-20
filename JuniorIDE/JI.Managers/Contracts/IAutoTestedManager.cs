using System;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IAutoTestedManager : IDisposable
    {
        ServiceResult<TryingHistory> Test(string userId, string taskId);
    }
}
