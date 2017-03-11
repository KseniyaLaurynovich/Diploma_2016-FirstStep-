using JI.DataStorageAccess.Helpers;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.Managers.Managers.Identity
{
    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        protected ApplicationRoleManager(IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            var appRoleManager = new ApplicationRoleManager(IdentityHelper.RoleStore());
            return appRoleManager;
        }
    }
}
