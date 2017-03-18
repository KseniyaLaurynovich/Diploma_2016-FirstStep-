using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Business.Extensions
{
    public static class SqlHierarchyIdExtensions
    {
        public static string ToValidString(this SqlHierarchyId id)
        {
            return id.IsNull ? null : id.ToString();
        }
    }
}
