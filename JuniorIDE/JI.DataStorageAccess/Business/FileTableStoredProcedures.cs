using System;
using System.Data.Common;
using System.Data.SqlTypes;
using System.Linq;
using JI.DataStorageAccess.Models;
using LinqToDB.Data;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Business
{
    internal class FileTableStoredProcedures
    {
        public static SqlHierarchyId InsertFile(DataConnection connection, File file)
        {
            var nameParameter = new DataParameter("name", file.Name);
            var streamParameter = file.Data != null
                ? new DataParameter("fileStream", file.Data)
                : new DataParameter("fileStream", SqlBinary.Null);
            var isFolderParameter = new DataParameter("isFolder", file.IsFolder);
            var parentParameter = file.ParentId.IsNull
                ? new DataParameter("parent", SqlHierarchyId.Null)
                : new DataParameter("parent", file.ParentId);

            var fileId = connection.QueryProc<SqlHierarchyId>(
                "InsertIntoFileTable",
                nameParameter, streamParameter, isFolderParameter, parentParameter)
                .FirstOrDefault();

            return fileId;
        }
    }
}
