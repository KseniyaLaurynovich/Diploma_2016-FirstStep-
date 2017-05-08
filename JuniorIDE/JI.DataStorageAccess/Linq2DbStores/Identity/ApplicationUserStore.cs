using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.Identity.Models;
using LinqToDB;
using Microsoft.AspNet.Identity;
using Task = System.Threading.Tasks.Task;
using System.Transactions;
using JI.DataStorageAccess.Business.Extensions;

namespace JI.DataStorageAccess.Linq2DbStores.Identity
{
    internal class ApplicationUserStore 
        : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>, 
        IUserEmailStore<ApplicationUser>, IUserRoleStore<ApplicationUser>,
        IUserSecurityStampStore<ApplicationUser>, IQueryableUserStore<ApplicationUser>,
        IUserGroupStore<ApplicationUser>
    {
        private JuniorDbConnection _dbConnection;

        private JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        #region IUserStore

        public Task CreateAsync(ApplicationUser user)
        {
            return UpdateAsync(user);
        }

        public Task UpdateAsync(ApplicationUser user)
        {
            var dbUser = Mapper.Map<ApplicationUser, User>(user);

            if (dbUser.Id == Guid.Empty)
            {
                dbUser.Id = (Guid) DbConnection.InsertWithIdentity(dbUser);
                user.Id = dbUser.Id.ToString();
            }
            else
            {
                DbConnection.Update(dbUser);
            }

            DbConnection.UserRoles.Delete(ur => ur.UserId == dbUser.Id);
            if (user.Roles.Any())
            {
                Array.ForEach(user.Roles.ToArray(), ur =>
                {
                    AddToRoleAsync(user, ur);
                });
            }

            DbConnection.UserGroups.Delete(ug => ug.UserId == dbUser.Id);
            if (user.Groups.Any())
            {
                Array.ForEach(user.Groups.ToArray(), ug =>
                {
                    AddToGroup(user, new Guid(ug.Id));
                });
            }

            return Task.FromResult(user.Id);
        }

        public Task DeleteAsync(ApplicationUser user)
        {
            var dbUser = Mapper.Map<ApplicationUser, User>(user);
            DbConnection.Delete(dbUser);

            return Task.FromResult(user.Id);
        }

        public Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var user = DbConnection.Users
                .LoadWith(u => u.UserRoles[0].Role)
                .LoadWith(u => u.UserGroups[0].Group)
                .FirstOrDefault(u => u.Id == new Guid(userId));

            return Task.FromResult(user?.Map<User, ApplicationUser>());
        }

        public Task<ApplicationUser> FindByNameAsync(string userName)
        {
            var user = DbConnection.Users
                .LoadWith(u => u.UserRoles[0].Role)
                .LoadWith(u => u.UserGroups[0].Group)
                .FirstOrDefault(u => u.UserName == userName);

            return Task.FromResult(user?.Map<User, ApplicationUser>());
        }

        #endregion

        #region IUserPasswordStore

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

        #endregion

        #region IUserEmailStore

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
            return Task.FromResult((user.IsEmailConfirmed));
        }

        public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed)
        {
            user.IsEmailConfirmed = confirmed;
            return Task.FromResult(user);
        }

        public Task<ApplicationUser> FindByEmailAsync(string email)
        {
            var user = DbConnection.Users
                .FirstOrDefault(e => e.Email.Equals(email));

            return Task.FromResult(
                user != null
                    ? Mapper.Map<User, ApplicationUser>(user)
                    : default(ApplicationUser));
        }

        #endregion

        #region IUserRoleStore
        public Task AddToRoleAsync(ApplicationUser user, string roleName)
        {
            string id = null;

            var roleId = DbConnection.Roles
                .FirstOrDefault(r => r.Name.Equals(roleName))
                ?.Id;

            if (roleId != null)
            {
                id = ((Guid)DbConnection.InsertWithIdentity(new UserRole()
                {
                    UserId = new Guid(user.Id),
                    RoleId = roleId.Value
                })).ToString();
            }

            return Task.FromResult(id);
        }

        public Task RemoveFromRoleAsync(ApplicationUser user, string roleName)
        {
            var roleId = DbConnection.Roles
                .FirstOrDefault(r => r.Name.Equals(roleName))
                ?.Id;

            if (roleId == null)
            {
                return Task.FromResult((string)null);
            }

            var userRole = DbConnection.UserRoles
                .FirstOrDefault(ur => 
                    ur.UserId.Equals(new Guid(user.Id)) && ur.RoleId.Equals(roleId.Value));

            if (userRole != null)
            {
                DbConnection.Delete(userRole);
            }

            return Task.FromResult(0);
        }

        public Task<IList<string>> GetRolesAsync(ApplicationUser user)
        {
            var roles = DbConnection.Users
                .Where(u => u.Id.Equals(new Guid(user.Id)))
                .Select(u => u.GetRoles())
                .FirstOrDefault()
                ?.Select(r => r.Name)
                .ToList();

            return Task.FromResult((IList<string>)roles);
        }

        public Task<bool> IsInRoleAsync(ApplicationUser user, string roleName)
        {
            var isInRole = DbConnection.UserRoles
                    .LoadWith(ur => ur.Role)
                    .Any(ur => ur.UserId.Equals(new Guid(user.Id)) && ur.Role.Name.Equals(roleName));

            return Task.FromResult(isInRole);
        }

        #endregion

        #region IUserSecurityStampStore

        public Task SetSecurityStampAsync(ApplicationUser user, string stamp)
        {
            user.SecurityStamp = stamp;
            return Task.FromResult(user);
        }

        public Task<string> GetSecurityStampAsync(ApplicationUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            return Task.FromResult((user.SecurityStamp));
        }

        #endregion

        #region IQueryableUserStore

        public IQueryable<ApplicationUser> Users => DbConnection.Users
            .LoadWith(u => u.UserRoles[0].Role)
            .LoadWith(u => u.UserGroups[0].Group)
            .Select(Mapper.Map<User, ApplicationUser>)
            .AsQueryable();

        #endregion

        #region IUserGroupStore

        public void AddToGroup(ApplicationUser user, Guid groupId)
        {
            DbConnection.Insert(new UserGroup()
            {
                UserId = new Guid(user.Id),
                GroupId = groupId
            });
        }

        public void RemoveFromGroup(ApplicationUser user, Guid groupId)
        {
            var userGroup = DbConnection.UserGroups
                .FirstOrDefault(ug =>
                    ug.UserId.Equals(new Guid(user.Id)) && ug.GroupId.Equals(groupId));

            if (userGroup != null)
            {
                DbConnection.Delete(userGroup);
            }
        }

        public IList<Group> GetGroups(string userId)
        {
            return DbConnection.Users
                .Where(u => u.Id.Equals(new Guid(userId)))
                .Select(u => u.GetGroups())
                .FirstOrDefault()
                ?.ToList();
        }

        public bool IsInGroup(ApplicationUser user, Guid groupId)
        {
            var isInGroup = DbConnection.UserGroups
                     .Any(ur => ur.UserId.Equals(new Guid(user.Id)) && ur.GroupId.Equals(groupId));

            return isInGroup;
        }

        #endregion

        public void Dispose()
        {
            _dbConnection?.Dispose();
        }
    }
}