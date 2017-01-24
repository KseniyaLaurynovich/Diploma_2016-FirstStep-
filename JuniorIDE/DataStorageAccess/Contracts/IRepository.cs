using System;
using System.Linq;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface IRepository<T>
        where T : class, IWithIdentifier
    {
        Guid Save(T item);

        void Delete(Guid id);

        T GetById(Guid id);

        IQueryable<T> Items();
    }
}
