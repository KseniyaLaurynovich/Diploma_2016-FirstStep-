using FirstStep_Storage.Models.Contracts;
using System.Linq;

namespace FirstStep_Storage.Contracts
{
    public interface IDataRepository
    {
        int Save<T>(T obj)
            where T : class, IHasIdentity;

        void Delete<T>(T obj)
            where T : class, IHasIdentity;

        T GetById<T>(int id)
            where T : class, IHasIdentity;

        IQueryable<T> Items<T>()
            where T : class, IHasIdentity;
    }
}
