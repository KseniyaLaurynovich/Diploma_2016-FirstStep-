using System;
using System.Collections.Generic;
using System.Linq;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TestStore : BaseStore<Test>, ITestStore
    {
        public IList<TestPaths> GetPaths(Guid taskId)
        {
            var result = new List<TestPaths>();

            foreach (var test in DbConnection
                                .Tests.Where(t => t.TaskId == taskId)
                                .ToList())
            {
                result.Add(new TestPaths
                {
                    Id = test.Id,
                    InputPath = FileTableStoredProcedures.GetPhysicalPath(DbConnection, test.InputFileId),
                    OutputPath = FileTableStoredProcedures.GetPhysicalPath(DbConnection, test.OutputFileId)
                });
            }

            return result;
        }
    }
}
