using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;
using Microsoft.AspNet.Identity;

namespace JI.DataStorageAccess.Contracts
{
    public interface IUserGroupStore<TUser> : IUserStore<TUser, string>
        where TUser : class, IUser<string>
    {
        void AddToGroup(TUser user, Guid groupId);

        void RemoveFromGroup(TUser user, Guid groupId);

        IList<Group> GetGroups(string userId);

        bool IsInGroup(TUser user, Guid groupId);
    }
}
