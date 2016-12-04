using BusinesServices.Models;
using System.Collections.Generic;

namespace BusinesServices.Contracts
{
    public interface IGroupService
    {
        IList<Group> GetAll();
        void Save(Group group);
        void Delete(string id);
        Group GetById(string id);

        void AssignToGroup(string groupId, string subjectId);

        void UnassignFromGroup(string groupId, string subjectId);
    }
}
