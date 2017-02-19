using System;
using System.Linq;
using JI.DataStorageAccess.Repositories.Models;

namespace JI.DataStorageAccess.Repositories.Contracts
{
    public interface ISubjectsRespository : IRepository<Subject>
    {
        IQueryable<Subject> GetByUser(Guid userId);
    }
}