using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface ITryingHistoryStore : IStore<TryingHistory>
    {
        IEnumerable<TryingHistory> FindByProject(Guid projectId);
    }
}
