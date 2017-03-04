using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace JI.DataStorageAccess.Identity.Contracts
{
    public interface IUpdateUserStore<TUser> : IUserStore<TUser, string>
        where TUser : class, IUser<string>
    {
        Task UpdateWithRolesAsync(TUser user, string[] addedRoles, string[] removedRoles);
    }
}
