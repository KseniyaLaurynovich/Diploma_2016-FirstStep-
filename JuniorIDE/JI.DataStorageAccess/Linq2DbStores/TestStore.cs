﻿using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TestStore : BaseStore<Test>, ITestStore
    {}
}
