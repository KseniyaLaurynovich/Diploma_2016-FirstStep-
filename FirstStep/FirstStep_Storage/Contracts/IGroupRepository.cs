using System.Collections.Generic;
using FirstStep_Storage.Models;

namespace FirstStep_Storage.Contracts
{
    public interface IGroupRepository : IDataRepository<Group>
    {
        IList<Group> GetGroupsBySubject(string subjectId);
    }
}
