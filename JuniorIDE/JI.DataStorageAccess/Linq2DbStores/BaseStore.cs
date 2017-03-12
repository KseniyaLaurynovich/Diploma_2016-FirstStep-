using System;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbStores
{
    public abstract class BaseStore<T> : IStore<T>
        where T : class, IWithIdentifier
    {
        private JuniorDbConnection _dbConnection;

        protected JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        public virtual void Delete(Guid id)
        {
            var item = FindById(id);
            if (item != null)
            {
                DbConnection.Delete(item);
            }
        }

        public virtual T FindById(Guid id)
        {
            return DbConnection.GetTable<T>().FirstOrDefault(e => e.Id == id);
        }

        public virtual IQueryable<T> Items => DbConnection.GetTable<T>();

        public virtual Guid Save(T subject)
        {
            if (subject.Id == Guid.Empty)
            {
                return (Guid)DbConnection.InsertWithIdentity(subject);
            }

            DbConnection.Update(subject);
            
            return subject.Id;
        }

        public void Dispose()
        {
            _dbConnection?.Dispose();
        }
    }
}
