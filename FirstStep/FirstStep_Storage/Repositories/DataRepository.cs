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
        public T GetById<T>(int id)
            where T : class, IHasIdentity
        {
            using (var db = new FirstStepDb())
            {
                var result = db.GetTable<T>().FirstOrDefault(e => e.Id == id);
                return result;
            }
        }

        public int Save<T>(T obj)
            where T : class, IHasIdentity
        {
            using (var dbConnection = new FirstStepDb())
            {
                if (obj.Id == default(int))
                {
                    return Convert.ToInt32(dbConnection.InsertWithIdentity(obj));
                }
                {
                    dbConnection.Update(obj);
                    return obj.Id;
                }
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
            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.GetTable<T>().AsQueryable();
            }
        }
    }
}
