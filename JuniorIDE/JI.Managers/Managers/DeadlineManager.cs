using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using Group = JI.Managers.Models.Group;

namespace JI.Managers.Managers
{
    internal class DeadlineManager : IDeadlineManager
    {
        private readonly ITaskDeadlineStore _deadlineStore;
        private readonly ISubjectStore _subjectStore;
        private readonly ITaskStore _taskStore;

        public DeadlineManager(
            ITaskDeadlineStore deadlineStore, ISubjectStore subjectStore, ITaskStore taskStore)
        {
            _deadlineStore = deadlineStore;
            _subjectStore = subjectStore;
            _taskStore = taskStore;
        }

        public ServiceResult<IDictionary<Group, DateTime?>> FindByTask(string taskId)
        {
            var deadlines = _deadlineStore
                .FindByTask(new Guid(taskId))
                .ToDictionary(i => i.Key.Map<DataStorageAccess.Models.Group, Group>(), i => i.Value);

            return ServiceResult<IDictionary<Group, DateTime?>>.Success(deadlines);
        }

        public ServiceResult SaveDeadlineForTask(string taskId, string groupId, DateTime? deadline)
        {
            var subjectId = _taskStore.FindById(new Guid(taskId)).SubjectId;
            var subjectGroupId = _subjectStore.FindById(subjectId).SubjectGroups
                .FirstOrDefault(sg => sg.GroupId.Equals(new Guid(groupId)))
                ?.Id; ;
            var taskDeadline = _deadlineStore.FindByTask(new Guid(taskId))
                .FirstOrDefault(d => d.Key.Id.Equals(new Guid(groupId)))
                .;

            if(subjectGroupId == null)
                return ServiceResult.Success;

            var newTaskDeadline = new TaskDeadline
            {
                TaskId = new Guid(taskId),
                GroupSubjectId = subjectGroupId.Value,
                Deadline = deadline
            };

            if(taskDeadline != null)
                newTaskDeadline.Id = taskDeadline.Id

            _deadlineStore.Save();

            return ServiceResult.Success;
        }

        public void Dispose()
        {
            _taskStore?.Dispose();
            _deadlineStore?.Dispose();
            _subjectStore?.Dispose();
        }
    }
}
