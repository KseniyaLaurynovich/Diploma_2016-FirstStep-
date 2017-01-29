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
        public virtual void Delete(Guid id)
        {
            var item = GetById(id);
            if (item != null)
            {
                using (var db = new JuniorDbConnection())
                {
                    db.Delete(item);
                }
            }
        }

        public virtual T GetById(Guid id)
        {
            T result;
            using (var db = new JuniorDbConnection())
            {
                result = db.GetTable<T>().FirstOrDefault(e => e.Id == id);
            }
            return result;
        }

        public virtual IQueryable<T> Items()
        {
            using (var dbConnection = new JuniorDbConnection())
            {
                return dbConnection.GetTable<T>();
            }
        }

        public virtual Guid Save(T obj)
        {
            using (var dbConnection = new JuniorDbConnection())
            {
                if (obj.Id == Guid.Empty)
                {
                    return (Guid)dbConnection.InsertWithIdentity(obj);
                }

                dbConnection.Update(obj);
            }
            
            return obj.Id;
        }
    }
}
