using JI.UserIdentity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.UserIdentity.Managers
{
    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        public ApplicationRoleManager(IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            var store = context.Get<IRoleStore<ApplicationRole, string>>();
            var appRoleManager = new ApplicationRoleManager(store);
            return appRoleManager;
        }
    }
}
