using JI.UserIdentity.Managers;
using Owin;

namespace JI.UserIdentity.Infrastructure
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
