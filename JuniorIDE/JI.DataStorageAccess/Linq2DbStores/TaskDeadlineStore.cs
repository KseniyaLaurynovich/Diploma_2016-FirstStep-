using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TaskDeadlineStore : BaseStore<TaskDeadline>, ITaskDeadlineStore
    {
        public IDictionary<Group, DateTime?> FindByTask(Guid taskId)
        {
            var task = DbConnection.Tasks.FirstOrDefault(t => t.Id.Equals(taskId));

            if(task == null)
                return new Dictionary<Group, DateTime?>();

            var groups = DbConnection.GroupSubjects
                .LoadWith(gs => gs.Group)
                .Where(gs => gs.SubjectId.Equals(task.SubjectId))
                .ToArray();

            var result = new Dictionary<Group, DateTime?>();
            Array.ForEach(groups, g =>
            {
                var deadline =
                    DbConnection.TaskDeadlines
                        .FirstOrDefault(td => td.GroupSubjectId.Equals(g.Id) && td.TaskId.Equals(taskId))
                        ?.Deadline;
                result.Add(g.Group, deadline);
            });
            return result;
        }
    }
}
