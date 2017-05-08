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
        public void SaveByGroup(Guid taskId, Guid groupId, DateTime? deadline)
        {
            var task = DbConnection.Tasks
                .LoadWith(t => t.Deadlines)
                .FirstOrDefault(t => t.Id.Equals(taskId));

            var groupSubject = DbConnection.GroupSubjects
                .FirstOrDefault(gs => gs.SubjectId == task.SubjectId && gs.GroupId == groupId);

            var taskDeadline = task.Deadlines
                .FirstOrDefault(td => td.GroupSubjectId == groupSubject.Id && td.TaskId == taskId);

            if (taskDeadline == null)
            {
                DbConnection.InsertWithIdentity(new TaskDeadline
                {
                    TaskId = taskId,
                    GroupSubjectId = groupSubject.Id,
                    Deadline = deadline
                });
                return;
            }

            taskDeadline.Deadline = deadline;
            DbConnection.Update(taskDeadline);
        }

        public IDictionary<Group, DateTime?> FindByTask(Guid taskId)
        {
            var task = DbConnection.Tasks.FirstOrDefault(t => t.Id.Equals(taskId));

            if(task == null)
                return new Dictionary<Group, DateTime?>();

            var result = DbConnection.GroupSubjects
                .LoadWith(gs => gs.Group)
                .LoadWith(gs => gs.Deadlines)
                .Where(gs => gs.SubjectId == task.SubjectId)
                .ToDictionary(g => g.Group, g => g.Deadlines.FirstOrDefault(d => d.TaskId == taskId)?.Deadline);

            return result;
        }
    }
}
