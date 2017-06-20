﻿using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Business.Extensions;
using Microsoft.SqlServer.Types;
using DbModels = JI.DataStorageAccess.Models;

namespace JI.Managers.Managers
{
    internal class TaskManager : Manager<Task, DbModels.Task>, ITaskManager
    {
        protected readonly IObjectSpecifiedFolderStore<DbModels.Task> TaskTestsFolderStore;
        protected readonly IProjectStore ProjectStore;
        protected readonly ITryingHistoryStore TryingHistoryStore;
        private readonly IObjectSpecifiedFolderStore<DbModels.Project> _projectFolderStore;

        public TaskManager(ITaskStore store, 
            IObjectSpecifiedFolderStore<DbModels.Task> taskTestsFolderStore, 
            IProjectStore projectStore, ITryingHistoryStore tryingHistoryStore, IObjectSpecifiedFolderStore<DbModels.Project> projectFolderStore) 
            : base(store)
        {
            TaskTestsFolderStore = taskTestsFolderStore;
            ProjectStore = projectStore;
            TryingHistoryStore = tryingHistoryStore;
            _projectFolderStore = projectFolderStore;
        }

        public override ServiceResult<Task> Save(Task subject)
        {
            var now = DateTime.Now;
            if (string.IsNullOrWhiteSpace(subject.Id))
            {
                subject.CreationDate = now;
            }
            subject.LastModified = now;

            return base.Save(subject);
        }

        public ServiceResult SetVisibility(string taskId, bool isVisible)
        {
            var task = Store.FindById(new Guid(taskId));

            if (task != null)
            {
                task.IsVisible = isVisible;
                Store.Save(task);
                return ServiceResult.Success;
            }

            return ServiceResult.Failed(Resources.Resources.InternalError);
        }

        public ServiceResult<File> AssociateTestFile(string taskId, File file)
        {
            if(TaskTestsFolderStore.FileExists(new Guid(taskId), file.Name))
                return ServiceResult<File>.Failed($"Test file with name '{file.Name}' already exists.");

           file.Id = TaskTestsFolderStore
                .SaveFile(new Guid(taskId), file.Map<File, DbModels.File>())
                .ToValidString();

            return ServiceResult<File>.Success(file);
        }
        
        public void RemoveExtraFiles(string taskId, string[] filesIds)
        {
            var allFilesIds = TaskTestsFolderStore
                .GetAllFiles(new Guid(taskId))
                .Select(f => f.Id).ToList();

            var extraFilesIds = allFilesIds
                .Except(filesIds.Select(f => SqlHierarchyId.Parse(f)))
                .ToArray();

            Array.ForEach(extraFilesIds, f =>
            {
                TaskTestsFolderStore.RemoveFile(f);
            });
        }

        public ServiceResult<Task> GetTaskForUser(string currentUserId, string taskId, IList<Group> groups)
        {
            var task = (Store as ITaskStore).FindByIdAndGroups(new Guid(taskId), groups.Select(g => new Guid(g.Id)).ToArray())
                .Map<JI.DataStorageAccess.Models.Task, Task>();

            var project = ProjectStore.FindByTaskAndUser(new Guid(currentUserId), new Guid(taskId));

            if (project != null)
            {
                task.HasUploadedProject = true;
                task.Testing = project.Testing;
                task.Mark = project.Mark;

                var tryingHistory = TryingHistoryStore.FindByProject(project.Id)?.Last();
                task.IsPassed = tryingHistory != null && tryingHistory.Compiled && tryingHistory.Items.All(i => i.Pass);
            }
            else
            {
                task.HasUploadedProject = false;
            }

            return ServiceResult<Task>.Success(task);
        }

        public IList<Task> GetByGroups(IList<Group> groups)
        {
            return (Store as ITaskStore)
                .FindByGroups(groups.Select(g => new Guid(g.Id)).ToArray())
                .Select(Mapper.Map<DbModels.Task, Task>)
                //.Where(t => t.IsVisible)
                .ToList();
        }

        public ServiceResult SetMark(string userId, string taskId, int? mark)
        {
            var project = GetOrCreate(userId, taskId);
            project.Mark = mark;

            ProjectStore.Save(project);
            return ServiceResult.Success;
        }

        public override void Dispose()
        {
            base.Dispose();
            ProjectStore?.Dispose();
            TryingHistoryStore?.Dispose();
        }

        #region protected

        protected override ServiceResult Validate(Task task)
        {
            var id = task.Id != null ? new Guid(task.Id) : Guid.Empty;
            if (Store.Items.Any(s =>
                            s.Name.Equals(task.Name)
                            && s.SubjectId.Equals(new Guid(task.SubjectId))
                            && !s.Id.Equals(id)))
            {
                return ServiceResult.Failed(Resources.Resources.TaskNameDuplicated(task.Name));
            }

            return ServiceResult.Success;
        }

        protected DbModels.Project GetOrCreate(string userId, string taskId)
        {
            var project = ProjectStore.FindByTask(new Guid(userId), new Guid(taskId));

            if (project == null)
            {
                project = new DbModels.Project
                {
                    UserId = new Guid(userId),
                    CreationDate = DateTime.Now,
                    TaskId = new Guid(taskId),
                    ModificationDate = DateTime.Now
                };

                project.Id = ProjectStore.Save(project);
            }

            if (project.ProjectFolder.IsNull)
            {
                project.ProjectFolder = _projectFolderStore.CreateSpecificObjFolder(project);
            }

            return project;
        }

        protected override DbModels.Task Map(Task model)
        {
            var dbModel = !string.IsNullOrWhiteSpace(model.Id)
                ? Store.FindById(new Guid(model.Id))
                : new DbModels.Task();

            return model.Map(dbModel);
        }

        #endregion
    }
}
