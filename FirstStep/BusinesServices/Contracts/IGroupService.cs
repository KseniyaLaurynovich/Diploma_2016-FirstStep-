using BusinesServices.Models;
using System.Collections.Generic;

namespace BusinesServices.Contracts
{
    public interface IGroupService
    {
        IList<Group> GetAll();
        void Save(Group group);
        void Delete(string id);
        void GetById(string id);
        void AssignUser(string userId);
        void AssignUsers(string[] usersIds);
        void RemoveFromGroup(string userId);
    }
}
