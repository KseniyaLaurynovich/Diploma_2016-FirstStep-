using System;
using System.IO;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface IProjectStore : IStore<Project>
    {
        Project FindByTask(Guid userId, Guid taskId);
        void LoadStream(Guid projectId, Stream projectStream);
        string GetProjectPath(Guid userId, Guid taskId);
        Project FindByTaskAndUser(Guid userId, Guid taskId);
    }
}
