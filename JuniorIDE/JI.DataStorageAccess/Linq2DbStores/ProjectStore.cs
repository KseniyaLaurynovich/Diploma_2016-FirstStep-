using System;
using System.IO;
using System.Linq;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using System.IO.Compression;

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
            var tempZipName = $"D:/Temp/{Guid.NewGuid()}.zip";

            if (folder.HasValue)
            {
                using (projectStream)
                {
                    using (var file = System.IO.File.Create(tempZipName))
                    {
                        projectStream.CopyTo(file);
                    }
                }

                var path = FileTableStoredProcedures.GetPhysicalPath(DbConnection, folder.Value);
                ZipFile.ExtractToDirectory(tempZipName, path);
            }
        }
    }
}
