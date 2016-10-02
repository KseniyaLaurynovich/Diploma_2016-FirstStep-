using FirstStep_Storage.Models;
using FirstStep_Storage.Models.Contracts;
using System.Linq;

namespace FirstStep_Storage.Contracts
{
    public interface IRepository<T>
        where T : class, IHasIdentity
    {
        void Add(T obj);
        void Update(T obj);
        void Delete(T obj);
        T GetById(int id);
        IQueryable<T> Items();
    }
}
