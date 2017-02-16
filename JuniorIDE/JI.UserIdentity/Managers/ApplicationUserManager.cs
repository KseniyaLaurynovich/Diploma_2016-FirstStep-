using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JI.DataStorageAccess.Identity.Contracts;
using JI.DataStorageAccess.Identity.Linq2DbStores;
using JI.DataStorageAccess.Identity.Models;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.UserIdentity.Managers
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        protected ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public IdentityResult UpdateWithRoles(ApplicationUser user, string[] addedRoles, string[] removedRoles)
        {
            var userValidation = UserValidator.ValidateAsync(user).Result;

            if (userValidation != IdentityResult.Success)
            {
                return userValidation;
            }

            try
            {
                (Store as IUpdateUserStore<ApplicationUser>)
                   ?.UpdateWithRolesAsync(user, addedRoles, removedRoles)
                   .GetAwaiter()
                   .GetResult();
                return IdentityResult.Success;
            }
            catch (Exception)
            {
                //todo add logging
                return IdentityResult.Failed("Server error");
            }
        }

        public static ApplicationUserManager Create(
            IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new ApplicationUserStore());

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
