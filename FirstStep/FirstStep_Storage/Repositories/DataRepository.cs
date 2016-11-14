using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using FirstStep_Storage.Models.Contracts;
using System.Linq;
using System;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    internal class DataRepository : IDataRepository
    {
        public T GetById<T>(string id)
            where T : class, IHasIdentity
        {
            using (var db = new FirstStepDb())
            {
                var result = db.GetTable<T>().FirstOrDefault(e => e.Id == id);
                return result;
            }
        }

        public string Save<T>(T obj)
            where T : class, IHasIdentity
        {
            using (var dbConnection = new FirstStepDb())
            {
                if (obj.Id == null)
                {
                    obj.Id = Guid.NewGuid().ToString();
                    dbConnection.InsertWithIdentity(obj);
                }
                {
                    dbConnection.Update(obj);
                }

                return obj.Id;
            }
        }

        public void Delete<T>(T obj)
            where T : class, IHasIdentity
        {
            using (var dbConnection = new FirstStepDb())
            {
                dbConnection.Delete(obj);
            }
        }

        public IQueryable<T> Items<T>()
            where T : class, IHasIdentity
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.GetTable<T>().AsQueryable();
            }
        }
    }
}
