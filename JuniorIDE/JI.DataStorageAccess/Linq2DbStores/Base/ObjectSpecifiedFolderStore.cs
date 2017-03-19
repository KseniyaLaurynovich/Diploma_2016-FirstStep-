using System;
using System.Linq;
using System.Transactions;
using JI.DataStorageAccess.Business;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Linq2DbStores.Base
{
    internal abstract class ObjectSpecifiedFolderStore<T> : IObjectSpecifiedFolderStore<T>
        where T : class, IWithIdentifier
    {
        private JuniorDbConnection _dbConnection;

        protected JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        protected abstract string GetObjSpecificFolderName(T obj);

        protected abstract SqlHierarchyId GetSpecifiedObjFolder(T obj);

        protected abstract void SetSpecifiedObjFolder(SqlHierarchyId folderId, T obj);

        public SqlHierarchyId SaveFile(Guid objId, File file)
        {
            var obj = DbConnection.GetTable<T>()
                .FirstOrDefault(o => o.Id.Equals(objId));

            var folderId = GetSpecifiedObjFolder(obj);
            if (folderId.IsNull)
            {
                folderId = CreateSpecificObjFolder(obj);
                SetSpecifiedObjFolder(folderId, obj);
            }
            file.ParentId = folderId;

            return FileTableStoredProcedures.InsertFile(DbConnection, file);
        }

        protected SqlHierarchyId CreateSpecificObjFolder(T obj)
        {
            using (var transaction = new TransactionScope())
            {
                var folder = new File
                {
                    Name = GetObjSpecificFolderName(obj),
                    IsFolder = true
                };

                var folderId = FileTableStoredProcedures.InsertFile(DbConnection, folder);
                SetSpecifiedObjFolder(folderId, obj);

                DbConnection.Update(obj);

                transaction.Complete();
                return folderId;
            }
        }
    }
}
