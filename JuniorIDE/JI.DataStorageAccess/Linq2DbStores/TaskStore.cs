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
        public override Guid Save(Task task)
        {
            using (var transaction = DbConnection.BeginTransaction())
            {
                task.Id = base.Save(task);

                var oldTests = GetTests(task);
                var removedTests = oldTests.Where(ot => !task.Tests.Any(t => ot.Id.Equals(t.Id)));

                foreach (var test in task.Tests??Enumerable.Empty<Test>())
                {
                    AddTest(task, test);
                }

                foreach (var test in removedTests)
                {
                    RemoveTest(task, test);
                }

                transaction.Commit();

                return task.Id;
            }
        }

        public override IQueryable<Task> Items => DbConnection.Tasks
            .LoadWith(t => t.Tests);

        public override Task FindById(Guid id) => DbConnection.Tasks
            .LoadWith(t => t.Tests)
            .FirstOrDefault(t => t.Id == id);

        public IList<Task> FindByGroup(Guid groupId)
        {
            var tasks =
               (from t in DbConnection.Tasks.LoadWith(t => t.Subject)
                join sg in DbConnection.GroupSubjects on t.SubjectId equals sg.SubjectId
                join td in DbConnection.TaskDeadlines.LoadWith(td => td.GroupSubject).Where(td => td.GroupSubject.GroupId == groupId) on t.Id equals td.TaskId
                where sg.GroupId == groupId
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
                .Set(p => p.OutputFile, test.OutputFile)
                .Set(p => p.InputFile, test.InputFile)
                .Update();
        }

        public void RemoveTest(Task task, Test test)
        {
            DbConnection.Delete(test);
        }

        #endregion
    }
}
