using System;
using System.Collections.Generic;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IGroupManager : IDisposable
    {
        ServiceResult<Group> Save(Group group);
        ServiceResult Delete(string id);
        IList<Group> GetAll();
        Group FindById(string groupId);
    }
}
