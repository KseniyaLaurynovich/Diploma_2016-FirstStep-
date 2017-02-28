using System;
using System.Collections.Generic;
using JI.Services.Business;
using JI.Services.Models;

namespace JI.Services.Contracts
{
    public interface IGroupService : IDisposable
    {
        ServiceResult<Group> Save(Group group);
        ServiceResult Delete(string id);
        IList<Group> GetAll();
        Group FindById(string groupId);
    }
}
