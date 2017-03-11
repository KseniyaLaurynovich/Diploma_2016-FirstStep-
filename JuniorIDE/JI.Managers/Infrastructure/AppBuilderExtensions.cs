using JI.Managers.Managers.Identity;
using Owin;

namespace JI.Managers.Infrastructure
{
    public static class AppBuilderExtensions
    {
        public static void UseApplicationIdentity(this IAppBuilder app)
        {
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
        }
    }
}
