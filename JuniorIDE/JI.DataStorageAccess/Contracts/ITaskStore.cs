using System;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Contracts
{
    public interface ITaskStore : IStore<Task>
    {
        SqlHierarchyId SaveTestFile(Guid taskId, File file);
    }
}
