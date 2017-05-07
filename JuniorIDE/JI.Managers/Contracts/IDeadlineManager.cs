using System;
using System.Collections.Generic;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IDeadlineManager : IDisposable
    {
        ServiceResult<IDictionary<Group, DateTime?>> FindByTask(string taskId);
        ServiceResult SaveDeadlineForTask(string taskId, string groupId, DateTime? deadline);
    }
}
