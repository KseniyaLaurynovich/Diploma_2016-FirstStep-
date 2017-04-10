using System;
using System.IO;
using System.IO.Compression;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using DalModels = JI.DataStorageAccess.Models;

namespace JI.Managers.Managers
{
    internal class ProjectManager : Manager<Project, DalModels.Project>, IProjectManager
    {
        private readonly IObjectSpecifiedFolderStore<DalModels.Project> _projectFolderStore;

        public ProjectManager(IProjectStore store, 
            IObjectSpecifiedFolderStore<DalModels.Project> projectFolderStore) 
            : base(store)
        {
            _projectFolderStore = projectFolderStore;
        }
        
        public ServiceResult CreateProjectByStream(Stream projectStream, string userId, string taskId)
        {
            var existingProject = GetOrCreate(userId, taskId);
            (Store as IProjectStore).LoadStream(new Guid(existingProject.Id), projectStream);

            return ServiceResult.Success;
        }

        #region protected

        protected Project GetOrCreate(string userId, string taskId)
        {
            var project = (Store as IProjectStore).FindByTask(new Guid(userId), new Guid(taskId));

            if (project == null)
            {
                project = new DalModels.Project
                {
                    UserId = new Guid(userId),
                    CreationDate = DateTime.Now,
                    TaskId = new Guid(taskId),
                    ModificationDate = DateTime.Now
                };

                project.Id = Store.Save(project);
            }

            if (project.ProjectFolder.IsNull)
            {
                project.ProjectFolder = _projectFolderStore.CreateSpecificObjFolder(project);
            }

            return project.Map<DalModels.Project, Project>();
        }

        protected override ServiceResult Validate(Project obj)
        {
            //TODO validate project
            return ServiceResult.Success;
        }

        #endregion
    }
}
