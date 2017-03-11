using JI.DataStorageAccess.Linq2DbStores.Identity;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;

namespace JI.DataStorageAccess.Helpers
{
    public static class IdentityHelper
    {
        public static IUserStore<ApplicationUser> UserStore()
        {
            return new ApplicationUserStore();
        }

        public static IRoleStore<ApplicationRole, string> RoleStore()
        {
            return new ApplicationRoleStore();
        }
    }
}
