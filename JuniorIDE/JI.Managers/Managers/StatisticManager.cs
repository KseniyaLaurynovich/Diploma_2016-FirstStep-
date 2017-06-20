using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.Identity.Models;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using Group = JI.DataStorageAccess.Models.Group;
using TryingHistory = JI.Managers.Models.TryingHistory;

namespace JI.Managers.Managers
{
    internal class StatisticManager : IStatisticManager
    {
        private readonly ITryingHistoryStore _tryingHistoryStore;
        private readonly IProjectStore _projectStore;
        private readonly ITaskStore _taskStore;

        public StatisticManager(
            ITryingHistoryStore tryingHistoryStore, IProjectStore projectStore, ITaskStore taskStore)
        {
            _tryingHistoryStore = tryingHistoryStore;
            _projectStore = projectStore;
            _taskStore = taskStore;
        }

        public ServiceResult<IList<TryingHistory>> Get(string userId, string taskId)
        {
            var project = _projectStore.FindByTaskAndUser(new Guid(userId), new Guid(taskId));

            if(project == null)
                return ServiceResult<IList<TryingHistory>>.Failed("Project for this task was not found");

            var tryings = _tryingHistoryStore.FindByProject(project.Id)
                .Select(Mapper.Map<DataStorageAccess.Models.TryingHistory, TryingHistory>);

            return ServiceResult<IList<TryingHistory>>.Success(tryings.ToList());
        }

        public ServiceResult<IList<GroupWithUsers>> GetGroupsWithUsers(string taskId)
        {
            var result = _taskStore.GetAssignedUsers(new Guid(taskId))
                .Select(i => new GroupWithUsers
                {
                    Group = i.Key.Map<Group, Models.Group>(),
                    Users = i.Value.Select(Mapper.Map<User, ApplicationUser>).ToList()
                })
                .ToList();

            Array.ForEach(array: result.ToArray(), action: (group) =>
            {
                Array.ForEach(group.Users.ToArray(), user =>
                {
                    user.Mark = _projectStore.FindByTaskAndUser(new Guid(user.Id), new Guid(taskId))?.Mark;
                });
            });

            return ServiceResult<IList<GroupWithUsers>>.Success(result.ToList());
        }

        public void Dispose()
        {
            _tryingHistoryStore?.Dispose();
            _projectStore?.Dispose();
            _taskStore?.Dispose();
        }
    }
}
