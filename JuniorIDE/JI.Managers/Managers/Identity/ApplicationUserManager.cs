using System;
using System.Linq;
using ExpressMapper;
using JI.Identity.Models;
using JI.Managers.Business;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Helpers;
using JI.DataStorageAccess.Models;
using JI.Managers.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;
using ExpressMapper.Extensions;

namespace JI.Managers.Managers.Identity
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

        public static ApplicationUserManager Create(
            IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(
                IdentityHelper.UserStore(), new ApplicationUserRolesValidator());

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

        public IList<Models.Group> GetGroups(string userId)
        {
            return (Store as IUserGroupStore<ApplicationUser>)
                   ?.GetGroups(userId)
                   .Select(Mapper.Map<Group, Models.Group>)
                   .ToList();
        }

        public override async Task<IdentityResult> UpdateAsync(ApplicationUser user)
        {
            var userValidation = UserValidator.ValidateAsync(user).Result;

            if (userValidation != IdentityResult.Success)
            {
                return userValidation;
            }

            var rolesValidation = RolesValidator.ValidateUserRoles(user.Roles);
            if (!rolesValidation.Succeeded)
            {
                return rolesValidation;
            }

            await Store.UpdateAsync(user);
            return IdentityResult.Success;
        }

        public IdentityResult ChangeUsername(string userId, string username)
        {
            var user = FindByIdAsync(userId).Result;
            if (user != null)
            {
                user.UserName = username;
                var validationResult = UserValidator.ValidateAsync(user).Result;
                if (validationResult.Succeeded)
                {
                    return UpdateAsync(user).Result;
                }
                return validationResult;
            }
            return new IdentityResult("User was not found.");
        }
    }
}
