using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface ITestStore : IStore<Test>
    {
        IList<Test> FindByTask(Guid taskId);
    }
}
