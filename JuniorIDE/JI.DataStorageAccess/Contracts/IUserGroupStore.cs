using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;
using Microsoft.AspNet.Identity;

namespace JI.DataStorageAccess.Contracts
{
    public interface IUserGroupStore<TUser> : IUserStore<TUser, string>
        where TUser : class, IUser<string>
    {
        void AddToGroupAsync(TUser user, Guid groupId);

        void RemoveFromGroupAsync(TUser user, Guid groupId);

        IList<Group> GetGroupsAsync(string userId);

        bool IsInGroupAsync(TUser user, Guid groupId);
    }
}
