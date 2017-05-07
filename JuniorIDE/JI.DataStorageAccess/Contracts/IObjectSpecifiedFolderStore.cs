using System;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Contracts
{
    public interface IObjectSpecifiedFolderStore<T>
        where T : class, IWithIdentifier
    {
        SqlHierarchyId SaveFile(Guid objId, File file);
        SqlHierarchyId CreateSpecificObjFolder(T obj);
        File[] GetAllFiles(Guid objId);
        bool FileExists(Guid objId, string fileName);
        void RemoveFile(SqlHierarchyId fileId);
    }
}
