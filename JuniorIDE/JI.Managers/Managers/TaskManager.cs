using System;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using System.Linq;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Business.Extensions;
using DbModels = JI.DataStorageAccess.Models;

namespace JI.Managers.Managers
{
    internal class TaskManager : Manager<Task, DbModels.Task>, ITaskManager
    {
        protected readonly IObjectSpecifiedFolderStore<DbModels.Task> TaskTestsFolderStore;

        public TaskManager(ITaskStore store, IObjectSpecifiedFolderStore<DbModels.Task> taskTestsFolderStore) 
            : base(store)
        {
            TaskTestsFolderStore = taskTestsFolderStore;
        }

        public override ServiceResult<Task> Save(Task obj)
        {
            var now = DateTime.Now;
            if (string.IsNullOrWhiteSpace(obj.Id))
            {
                obj.CreationDate = now;
            }
            obj.LastModified = now;

            return base.Save(obj);
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
           file.Id = TaskTestsFolderStore
                .SaveFile(new Guid(taskId), file.Map<File, DbModels.File>())
                .ToValidString();

            return ServiceResult<File>.Success(file);
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
