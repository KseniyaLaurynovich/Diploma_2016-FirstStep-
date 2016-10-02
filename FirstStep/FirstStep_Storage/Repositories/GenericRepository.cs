using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using FirstStep_Storage.Models.Contracts;
using LinqToDB;
using System;
using System.Linq;

namespace FirstStep_Storage.Repositories
{
    //todo change to internal
    public abstract class GenericRepository<T> : IRepository<T>
        where T: class, IHasIdentity
    {
        public void Add(T obj)
        {
            using (var dbConnection = new FirstStepDb())
            {
                obj.Id = Convert.ToInt32(dbConnection.InsertWithIdentity(obj));
            }
        }

        public void Update(T obj)
        {
            using (var dbConnection = new FirstStepDb())
            {
                dbConnection.Update(obj);
            }
        }

        public void Delete(T obj)
        {
            using (var dbConnection = new FirstStepDb())
            {
                dbConnection.Delete(obj);
            }
        }

        public abstract T GetById(int id);

        public abstract IQueryable<T> Items();
    }
}
