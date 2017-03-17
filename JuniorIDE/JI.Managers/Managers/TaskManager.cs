using System;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using System.Linq;

namespace JI.Managers.Managers
{
    internal class TaskManager : Manager<Task, DataStorageAccess.Models.Task>, ITaskManager
    {
        public TaskManager(ITaskStore store) 
            : base(store)
        {
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

            return ServiceResult.Failed(new [] { Resources.Resources.InternalError });
        }
    }
}
