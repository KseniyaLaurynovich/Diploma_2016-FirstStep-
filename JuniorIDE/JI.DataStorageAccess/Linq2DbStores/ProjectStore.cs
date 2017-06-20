using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using File = JI.DataStorageAccess.Models.File;
using System.Configuration;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class ProjectStore : BaseStore<Project>, IProjectStore
    {
        public Models.File GetProjectStructure(Guid userId, Guid taskId)
        {
            var project = FindByTask(userId, taskId);

            if (project == null)
                return null;

            var file = DbConnection.Files.FirstOrDefault(p => p.Id.Equals(project.ProjectFolder));
            GetChilder(new List<File> { file });

            return file;
        }

        private string[] ExcludedFolders = ConfigurationManager.AppSettings["cpp:exclude"].Split(',');

        private void GetChilder(IList<Models.File> files)
        {
            foreach (var file in files)
            {
                if (file.IsFolder)
                {
                    file.Children = DbConnection.Files
                        .Where(f => f.ParentId.Equals(file.Id))
                        .Where(f => !ExcludedFolders.Contains(f.Name))
                        .ToList();
                    GetChilder(file.Children);
                }
            }
        }

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

                Array.ForEach(Directory.GetFiles(path), System.IO.File.Delete);
                Array.ForEach(Directory.GetDirectories(path), p => Directory.Delete(p, true));

                using (var zip = Ionic.Zip.ZipFile.Read(projectStream))
                {
                    zip.ExtractAll(path);
                }
            }
        }

        public string GetProjectPath(Guid projectId)
        {
            var project = FindById(projectId);

            return project != null 
                ? FileTableStoredProcedures.GetPhysicalPath(DbConnection, project.ProjectFolder)
                : null;
        }

        public Project FindByTaskAndUser(Guid userId, Guid taskId)
        {
            return DbConnection.Projects
                .FirstOrDefault(p => p.UserId == userId && p.TaskId == taskId);
        }

        public void SetTestingMode(Guid existingProjectId, bool testing)
        {
            var project = FindById(existingProjectId);

            if (project == null) return;

            project.Testing = testing;
            Save(project);
        }
    }
}
