using System.Collections.Generic;
using FirstStep_Storage.Models.Contracts;
using System.Linq;

namespace FirstStep_Storage.Contracts
{
    public interface IDataRepository<T>
        where T : class, IHasIdentity
    {
        string Save(T obj);

        void Delete(T obj);

        T GetById(string id);

        IList<T> Items();
    }
}
