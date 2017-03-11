using JI.DataStorageAccess.Models;
using Microsoft.AspNet.Identity;

namespace JI.DataStorageAccess.Contracts
{
    public interface IAdvancedUserStore<TUser>
        where TUser: IUser
    {
        void AdvancedUpdateAsync(TUser user, Group[] groups);
    }
}
