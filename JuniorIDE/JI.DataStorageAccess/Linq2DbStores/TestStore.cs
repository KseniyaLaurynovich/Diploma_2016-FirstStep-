using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TestStore : BaseStore<Test>, ITestStore
    {
        public IList<Test> FindByTask(Guid taskId)
        {
            throw new NotImplementedException();
        }
    }
}
