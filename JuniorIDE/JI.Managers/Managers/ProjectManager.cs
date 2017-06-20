﻿using System;
using System.IO;
using System.Linq;
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
            var projectStore = Store as IProjectStore;

            projectStore.SetTestingMode(new Guid(existingProject.Id), true);

            try
            {
                projectStore.LoadStream(new Guid(existingProject.Id), projectStream);
            }
            finally
            {
                projectStore.SetTestingMode(new Guid(existingProject.Id), false);
            }

            return ServiceResult.Success;
        }

        public string GetPhysicalPath(string userId, string taskId)
        {
            var existingProject = GetOrCreate(userId, taskId);
            return (Store as IProjectStore).GetProjectPath(new Guid(existingProject.Id));
        }

        public Models.File GetProjectStructure(string userId, string taskId)
        {
            var result = (Store as IProjectStore)
                .GetProjectStructure(new Guid(userId), new Guid(taskId));

            return MapFile(result);
        }

        #region protected

        protected Models.File MapFile(DalModels.File file)
        {
            return new Models.File
            {
                Id = file.Id.ToString(),
                Name = file.Name,
                Children = file.Children?.Select(MapFile).ToList(),
                IsFolder = file.IsFolder
            };
        }

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
