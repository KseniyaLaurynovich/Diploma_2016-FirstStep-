using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JI.DataStorageAccess.Identity.Contracts;
using JI.DataStorageAccess.Identity.Linq2DbStores;
using JI.DataStorageAccess.Identity.Models;
using JI.Identity.Models;
using JI.UserIdentity.Business;
using JI.UserIdentity.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.UserIdentity.Managers
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        protected IRolesValidator<ApplicationUser, string> RolesValidator { get; set; }

        protected ApplicationUserManager(
            IUserStore<ApplicationUser> store, IRolesValidator<ApplicationUser, string> rolesValidator)
            : base(store)
        {
            RolesValidator = rolesValidator;
        }

        public IdentityResult UpdateWithRoles(ApplicationUser user, string[] addedRoles, string[] removedRoles)
        {
            var userValidation = UserValidator.ValidateAsync(user).Result;

            if (userValidation != IdentityResult.Success)
            {
                return userValidation;
            }

            var refreshedRoles = GetRolesAsync(user.Id).Result;
            refreshedRoles = refreshedRoles.Concat(addedRoles).ToList();
            refreshedRoles = refreshedRoles.Where(r => !removedRoles.Contains(r)).ToList();

            var rolesValidation = RolesValidator.ValidateUserRoles(refreshedRoles);
            if (!rolesValidation.Succeeded)
            {
                return rolesValidation;
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
            var manager = new ApplicationUserManager(
                new ApplicationUserStore(), new ApplicationUserRolesValidator());

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
