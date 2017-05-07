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

        public SqlHierarchyId CreateSpecificObjFolder(T obj)
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

        public bool FileExists(Guid objId, string fileName)
        {
            var obj = DbConnection.GetTable<T>()
                .FirstOrDefault(o => o.Id.Equals(objId));

            var folderId = GetSpecifiedObjFolder(obj);
            var existingFile = DbConnection.GetTable<File>()
                .FirstOrDefault(f => f.ParentId.Equals(folderId) && f.Name.Equals(fileName));

            return existingFile!= null;
        }

        public File[] GetAllFiles(Guid objId)
        {
            var obj = DbConnection.GetTable<T>()
                .FirstOrDefault(o => o.Id.Equals(objId));

            var folderId = GetSpecifiedObjFolder(obj);
            return DbConnection.GetTable<File>()
                .Where(f => f.ParentId.Equals(folderId))
                .ToArray();
        }

        public void RemoveFile(SqlHierarchyId fileId)
        {
            var file = DbConnection.GetTable<File>().FirstOrDefault(f => f.Id.Equals(fileId));

            if (file != null)
                DbConnection.Delete(file);
        }
    }
}
