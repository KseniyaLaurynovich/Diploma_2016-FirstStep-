using System.Collections.Generic;
using FirstStep_Storage.Models;

namespace FirstStep_Storage.Contracts
{
    public interface ISubjectRepository : IDataRepository<Subject>
    {
        IList<Subject> GetByUser(string userId);
    }
}   