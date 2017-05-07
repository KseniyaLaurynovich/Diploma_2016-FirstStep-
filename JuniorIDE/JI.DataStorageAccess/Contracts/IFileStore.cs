using System;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Contracts
{
    public interface IFileStore : IDisposable
    {
        File FindById(SqlHierarchyId fileId);
    }
}
