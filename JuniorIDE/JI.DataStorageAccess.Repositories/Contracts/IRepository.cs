using System;
using System.Linq;
using JI.DataStorageAccess.Repositories.Models;

namespace JI.DataStorageAccess.Repositories.Contracts
{
    public interface IRepository<T> : IDisposable
        where T : class, IWithIdentifier
    {
        Guid Save(T item);

        void Delete(Guid id);

        T GetById(Guid id);

        IQueryable<T> Items();
    }
}
