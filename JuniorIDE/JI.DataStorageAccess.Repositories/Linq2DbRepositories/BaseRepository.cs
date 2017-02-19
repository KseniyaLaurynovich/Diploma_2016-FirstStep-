using System;
using System.Linq;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Repositories.Linq2DbRepositories
{
    public abstract class BaseRepository<T> : IRepository<T>
        where T : class, IWithIdentifier
    {
        private JuniorDbConnection _dbConnection;

        protected JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        public virtual void Delete(Guid id)
        {
            var item = GetById(id);
            if (item != null)
            {
                DbConnection.Delete(item);
            }
        }

        public virtual T GetById(Guid id)
        {
            return DbConnection.GetTable<T>().FirstOrDefault(e => e.Id == id);
        }

        public virtual IQueryable<T> Items()
        {
            return DbConnection.GetTable<T>();
        }

        public virtual Guid Save(T obj)
        {
            if (obj.Id == Guid.Empty)
            {
                return (Guid)DbConnection.InsertWithIdentity(obj);
            }

            DbConnection.Update(obj);
            
            return obj.Id;
        }

        public void Dispose()
        {
            _dbConnection.Dispose();
        }
    }
}
