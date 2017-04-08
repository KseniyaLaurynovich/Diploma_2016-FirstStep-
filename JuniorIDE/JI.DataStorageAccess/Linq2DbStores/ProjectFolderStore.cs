using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class ProjectFolderStore : ObjectSpecifiedFolderStore<Project>
    {
        protected override string GetObjSpecificFolderName(Project obj) => $"project_{obj.UserId}_{obj.TaskId}";

        protected override SqlHierarchyId GetSpecifiedObjFolder(Project obj)
        {
            return obj.ProjectFolder;
        }

        protected override void SetSpecifiedObjFolder(SqlHierarchyId folderId, Project obj)
        {
            obj.ProjectFolder = folderId;
        }
    }
}
