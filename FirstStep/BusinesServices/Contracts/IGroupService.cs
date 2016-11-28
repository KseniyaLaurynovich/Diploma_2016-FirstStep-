using BusinesServices.Models;

namespace BusinesServices.Contracts
{
    public interface IGroupService
    {
        void Save(Group group);
        void Delete(string id);
        void GetById(string id);
        void AssignUser(string userId);
        void AssignUsers(string[] usersIds);
        void RemoveFromGroup(string userId);
    }
}
