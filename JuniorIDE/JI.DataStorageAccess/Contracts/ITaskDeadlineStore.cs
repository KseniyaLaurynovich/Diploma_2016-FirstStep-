using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface ITaskDeadlineStore : IStore<TaskDeadline>
    {
        IDictionary<Group, DateTime?> FindByTask(Guid taskId);
        void SaveByGroup(Guid taskId, Guid groupId, DateTime? deadline);
    }
}
