using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Managers.Managers
{
    internal class StatisticManager : IStatisticManager
    {
        private readonly ITryingHistoryStore _tryingHistoryStore;
        private readonly IProjectStore _projectStore;

        public StatisticManager(
            ITryingHistoryStore tryingHistoryStore, IProjectStore projectStore)
        {
            _tryingHistoryStore = tryingHistoryStore;
            _projectStore = projectStore;
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
    }
}
