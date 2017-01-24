using JI.UserIdentity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.UserIdentity.Managers
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {}

        public static ApplicationUserManager Create(
            IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var userStore = context.Get<IUserStore<ApplicationUser>>();
            var manager = new ApplicationUserManager(userStore);
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser>(
                        dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
