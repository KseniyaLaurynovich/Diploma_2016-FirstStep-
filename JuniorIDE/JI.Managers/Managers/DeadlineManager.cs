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
            //TODO validate deadline
            _deadlineStore.SaveByGroup(new Guid(taskId), new Guid(groupId), deadline);
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
