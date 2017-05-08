using System;
using System.Collections.Generic;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TaskStore : BaseStore<Task>, ITaskStore
    {
        public override Guid Save(Task obj)
        {
            using (var transaction = DbConnection.BeginTransaction())
            {
                obj.Id = base.Save(obj);

                var currentTests = GetTests(obj);
                var addedTests = obj.Tests.Where(test => currentTests.All(t => test.Id != t.Id)).ToArray();
                var removedTests = currentTests.Where(test => obj.Tests.All(t => test.Id != t.Id)).ToArray();

                Array.ForEach(addedTests, t =>
                {
                    AddTest(obj, t);
                });

                Array.ForEach(removedTests, t =>
                {
                    RemoveTest(obj, t);
                });

                transaction.Commit();

                return obj.Id;
            }
        }

        public override IQueryable<Task> Items => DbConnection.Tasks
            .LoadWith(t => t.Tests);

        public override Task FindById(Guid id) => DbConnection.Tasks
            .LoadWith(t => t.Subject)
            .LoadWith(t => t.Tests[0].InputFile)
            .LoadWith(t => t.Tests[0].OutputFile)
            .FirstOrDefault(t => t.Id == id);

        public Task FindByIdAndGroups(Guid id, Guid[] groupIds)
        {
            var result =
              (from t in DbConnection.Tasks.LoadWith(t => t.Subject)
               join sg in DbConnection.GroupSubjects on t.SubjectId equals sg.SubjectId
               join td in DbConnection.TaskDeadlines.LoadWith(td => td.GroupSubject).Where(td => groupIds.Contains(td.GroupSubject.GroupId)) on t.Id equals td.TaskId
               where groupIds.Contains(sg.GroupId)
               where t.Id.Equals(id)
               select new { Task = t, Deadline = td })
               .FirstOrDefault();

            if (result == null)
                return null;

            result.Task.Deadlines = new List<TaskDeadline> {result.Deadline};
            return result.Task;
        }

        public IList<Task> FindByGroups(Guid[] groupIds)
        {
            var tasks =
               (from t in DbConnection.Tasks.LoadWith(t => t.Subject)
                join sg in DbConnection.GroupSubjects on t.SubjectId equals sg.SubjectId
                join td in DbConnection.TaskDeadlines.LoadWith(td => td.GroupSubject).Where(td => groupIds.Contains(td.GroupSubject.GroupId)) on t.Id equals td.TaskId
                where groupIds.Contains(sg.GroupId)
                select new { Task = t, Deadline = td})
                .ToList();

            tasks.ForEach(t => t.Task.Deadlines = new List<TaskDeadline> {t.Deadline});
            return tasks.Select(t => t.Task).ToList();
        }

        #region TestsStore

        public IList<Test> GetTests(Task task)
        {
            return DbConnection.Tests
                .Where(t => t.TaskId.Equals(task.Id))
                .ToList();
        }

        public void AddTest(Task task, Test test)
        {
            test.TaskId = task.Id;
            if (test.Id == Guid.Empty)
            {
                DbConnection.Insert(test);
                return;
            }
            DbConnection.Tests
                .Where(p => p.Id == test.Id)
                .Set(p => p.OutputFileId, test.OutputFileId)
                .Set(p => p.InputFileId, test.InputFileId)
                .Update();
        }

        public void RemoveTest(Task task, Test test)
        {
            DbConnection.Delete(test);
        }

        public IDictionary<Group, User[]> GetAssignedUsers(Guid taskId)
        {
            var task = FindById(taskId);
            var groups = DbConnection.GroupSubjects
                .LoadWith(gs => gs.Group.UserGroups[0].User)
                .Where(gs => gs.SubjectId == task.SubjectId)
                .ToList();

            return groups
                .ToDictionary(g => g.Group, g => g.Group.UserGroups.Select(ug => ug.User)
                .ToArray());
        }

        #endregion
    }
}
