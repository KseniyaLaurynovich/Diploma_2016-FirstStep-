using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.UserIdentity.Models;
using Microsoft.AspNet.Identity;
using Task = System.Threading.Tasks.Task;

namespace JI.UserIdentity.StoreServices
{
    internal class ApplicationUserStoreService 
        : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>, 
        IUserEmailStore<ApplicationUser>, IUserRoleStore<ApplicationUser>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRolesRepository _rolesRepository;

        public ApplicationUserStoreService(
            IUsersRepository userRepository, IUserRolesRepository userRolesRepository, IRolesRepository rolesRepository)
        {
            _userRepository = userRepository;
            _userRolesRepository = userRolesRepository;
            _rolesRepository = rolesRepository;
        }

        public Task CreateAsync(ApplicationUser user)
        {
            return UpdateAsync(user);
        }

        public Task UpdateAsync(ApplicationUser user)
        {
            var id = _userRepository.Save(Mapper.Map<ApplicationUser, User>(user));
            return Task.FromResult(id);
        }

        public Task DeleteAsync(ApplicationUser user)
        {
            _userRepository.Delete(new Guid(user.Id));
            return Task.FromResult(user.Id);
        }

        public Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var user = _userRepository.GetById(new Guid(userId));
            return Task.FromResult(Mapper.Map<User, ApplicationUser>(user));
        }

        public Task<ApplicationUser> FindByNameAsync(string userName)
        {
            var user =_userRepository
                .Items()
                .FirstOrDefault(
                    u => u.UserName.Equals(userName));
            return Task.FromResult(
                user != null
                    ? Mapper.Map<User, ApplicationUser>(user)
                    : default(ApplicationUser));
        }

        public Task SetPasswordHashAsync(ApplicationUser user, string passwordHash)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(user);
        }

        public Task<string> GetPasswordHashAsync(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(ApplicationUser user)
        {
            return Task.FromResult(user.PasswordHash != null);
        }

        public Task SetEmailAsync(ApplicationUser user, string email)
        {
            user.Email = email;
            return Task.FromResult(user);
        }

        public Task<string> GetEmailAsync(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.FromResult((user.IsActive));
        }

        public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed)
        {
            user.IsActive = confirmed;
            return Task.FromResult(user);
        }

        public Task<ApplicationUser> FindByEmailAsync(string email)
        {
            var user = _userRepository
                .Items()
                .FirstOrDefault(
                    u => u.Email.Equals(email));
            return Task.FromResult(
                user != null
                    ? Mapper.Map<User, ApplicationUser>(user)
                    : default(ApplicationUser));
        }

        public Task AddToRoleAsync(ApplicationUser user, string roleName)
        {
            var roleId = _rolesRepository.GetByName(roleName)?.Id;
            if (roleId == null)
            {
                roleId = _rolesRepository.Save(new Role { Name = roleName });
            }

            var id = _userRolesRepository.Save(new UserRole
            {
                UserId = user.Id,
                RoleId = roleId.ToString()
            });

            return Task.FromResult(id);
        }

        public Task RemoveFromRoleAsync(ApplicationUser user, string roleName)
        {
            var roleId = _rolesRepository.GetByName(roleName)?.Id.ToString();

            if (roleId == null)
            {
                return Task.FromResult((string)null);
            }

            var id = _userRolesRepository.Items()
                        .FirstOrDefault(ur => ur.UserId.Equals(user.Id) && ur.RoleId.Equals(roleId))
                        ?.Id;

            if (id != null)
            {
                _userRolesRepository.Delete(id.Value);
            }

            return Task.FromResult(id);
        }

        public Task<IList<string>> GetRolesAsync(ApplicationUser user)
        {
            var roles =_userRolesRepository.Items()
                .Where(ur => ur.UserId.Equals(user.Id))
                .Select(ur => ur.Role.Name)
                .ToList();

            return Task.FromResult((IList<string>)roles);
        }

        public Task<bool> IsInRoleAsync(ApplicationUser user, string roleName)
        {
            var isInRole = _userRolesRepository.Items()
                .Any(ur => ur.UserId.Equals(user.Id) && ur.Role.Name.Equals(roleName));
            return Task.FromResult(isInRole);
        }

        public void Dispose()
        { }
    }
}