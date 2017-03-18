using System;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Business.Extensions;

namespace JI.Managers.Managers
{
    internal class TaskManager : Manager<Task, DataStorageAccess.Models.Task>, ITaskManager
    {
        public TaskManager(ITaskStore store) 
            : base(store)
        {}

        public override ServiceResult<Task> Save(Task obj)
        {
            var validationResult = Validate(obj);
            if (validationResult.Succeeded)
            {
                DataStorageAccess.Models.Task storageObj;
                if (!string.IsNullOrWhiteSpace(obj.Id))
                {
                    storageObj = Store.FindById(new Guid(obj.Id));
                    storageObj = obj.Map(storageObj);
                }
                else
                {
                    storageObj = obj.Map<Task, DataStorageAccess.Models.Task>();
                }

                try
                {
                    var id = Store.Save(storageObj).ToString();
                    return ServiceResult<Task>.Success(obj);
                }
                catch (Exception ex)
                {
                    //todo add logging
                    return ServiceResult<Task>.Failed(Resources.Resources.InternalError);
                }

            }

            return validationResult.Convert<Task>();
        }

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

        public ServiceResult<File> SaveTempFile(string taskId, File file)
        {
           var taskStore = Store as ITaskStore;
           file.Id = taskStore
                ?.SaveTestFile(new Guid(taskId), file.Map<File, DataStorageAccess.Models.File>())
                .ToValidString();

            return ServiceResult<File>.Success(file);
        }
    }
}
