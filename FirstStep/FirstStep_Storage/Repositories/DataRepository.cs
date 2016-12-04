using System;
using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using FirstStep_Storage.Models.Contracts;
using System.Linq;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    public class DataRepository<T> : IDataRepository<T>
        where T : class, IHasIdentity
    {
        public virtual T GetById(string id)
        {
            using (var db = new FirstStepDb())
            {
                var result = db.GetTable<T>().FirstOrDefault(e => e.Id == id);
                return result;
            }
        }

        public virtual string Save(T obj) 
        {
            using (var dbConnection = new FirstStepDb())
            {
                if (obj.Id == null)
                {
                    obj.Id = Guid.NewGuid().ToString();
                    dbConnection.InsertWithIdentity(obj);
                }
                else
                {
                    dbConnection.Update(obj);
                }

                return obj.Id;
            }
        }

        public virtual void Delete(T obj)
        {
            using (var dbConnection = new FirstStepDb())
            {
                dbConnection.Delete(obj);
            }
        }

        public virtual IQueryable<T> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.GetTable<T>();
            }
        }
    }
}
