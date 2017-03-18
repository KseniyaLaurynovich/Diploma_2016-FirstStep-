using System;
using System.Linq;
using System.Transactions;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TaskStore : BaseStore<Task>, ITaskStore
    {
        private string GetTempFolderName(Guid taskId) => $"task_{taskId}_tests";

        public override Guid Save(Task subject)
        {
            using (var transaction = new TransactionScope())
            {
                if (subject.Id == Guid.Empty)
                {
                    subject.Id = (Guid) DbConnection.InsertWithIdentity(subject);
                }

                DbConnection.Update(subject);

                foreach (var test in subject.Tests??Enumerable.Empty<Test>())
                {
                    test.TaskId = subject.Id;
                    DbConnection.InsertWithIdentity(test);
                }

                transaction.Complete();

                return subject.Id;
            }
        }

        public SqlHierarchyId SaveTestFile(Guid taskId, File file)
        {
            var task = FindById(taskId);

            if (task.TempFolder.IsNull)
            {
                task.TempFolder = GetTestsFolder(taskId);
            }
            file.ParentId = task.TempFolder;

            return FileTableStoredProcedures.InsertFile(DbConnection, file);
        }

        protected SqlHierarchyId GetTestsFolder(Guid taskId)
        {
            using (var transaction = new TransactionScope())
            {
                var task = FindById(taskId);
                if(task == null)
                    return SqlHierarchyId.Null;

                if (task.TempFolder.IsNull)
                {
                    task.TempFolder = 
                        FileTableStoredProcedures.InsertFile(
                            DbConnection, 
                            new File { Name = GetTempFolderName(taskId), IsFolder = true });

                    Save(task);
                }

                transaction.Complete();
                return task.TempFolder;
            }
        }

        public override IQueryable<Task> Items => DbConnection.Tasks.LoadWith(t => t.Tests);
        public override Task FindById(Guid id) => DbConnection.Tasks
            .LoadWith(t => t.Tests)
            .FirstOrDefault(t => t.Id == id);
    }
}
