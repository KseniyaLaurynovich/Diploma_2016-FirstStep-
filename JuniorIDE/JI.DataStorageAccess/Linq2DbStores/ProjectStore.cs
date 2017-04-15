using System;
using System.IO;
using System.Linq;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class ProjectStore : BaseStore<Project>, IProjectStore
    {
        public Project FindByTask(Guid userId, Guid taskId)
        {
            return DbConnection.Projects
                .FirstOrDefault(p => p.UserId == userId && p.TaskId == taskId);
        }

        public void LoadStream(Guid projectId, Stream projectStream)
        {
            var folder = FindById(projectId)?.ProjectFolder;

            if (folder.HasValue)
            {
                var path = FileTableStoredProcedures.GetPhysicalPath(DbConnection, folder.Value);

                using (var zip = Ionic.Zip.ZipFile.Read(projectStream))
                {
                    zip.ExtractAll(path);
                }
            }
        }

        public string GetProjectPath(Guid userId, Guid taskId)
        {
            var project = FindByTaskAndUser(userId, taskId);

            return project != null 
                ? FileTableStoredProcedures.GetPhysicalPath(DbConnection, project.ProjectFolder)
                : null;
        }

        public Project FindByTaskAndUser(Guid userId, Guid taskId)
        {
            return DbConnection.Projects
                .FirstOrDefault(p => p.UserId == userId && p.TaskId == taskId);
        }
    }
}
