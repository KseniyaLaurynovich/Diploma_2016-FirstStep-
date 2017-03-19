using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TaskTestsFolderStore : ObjectSpecifiedFolderStore<Task>
    {
        protected override string GetObjSpecificFolderName(Task obj) => $"task_{obj.Id}_tests";

        protected override SqlHierarchyId GetSpecifiedObjFolder(Task obj)
        {
            return obj.TempFolder;
        }

        protected override void SetSpecifiedObjFolder(SqlHierarchyId folderId, Task obj)
        {
            obj.TempFolder = folderId;
        }
    }
}
