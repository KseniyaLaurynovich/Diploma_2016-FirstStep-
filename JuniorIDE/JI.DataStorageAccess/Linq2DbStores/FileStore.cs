using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class FileStore : IFileStore
    {
        private JuniorDbConnection _dbConnection;

        protected JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        public File FindById(SqlHierarchyId fileId)
        {
            return DbConnection.Files.FirstOrDefault(f => f.Id.Equals(fileId));
        }

        public void Dispose()
        {
            _dbConnection?.Dispose();
        }
    }
}
