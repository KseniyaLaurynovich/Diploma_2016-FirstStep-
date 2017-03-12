using System;
using System.Linq;

namespace JI.DataStorageAccess.Contracts
{
    public interface IStore<T> : IDisposable
        where T: class
    {
        Guid Save(T subject);

        void Delete(Guid objId);

        T FindById(Guid objId);

        IQueryable<T> Items { get; }
    }
}
