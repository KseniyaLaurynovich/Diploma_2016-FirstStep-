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

namespace JI.DataStorageAccess.Linq2DbStores.Identity
{
    internal class ApplicationUserStore 
        : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>, 
        IUserEmailStore<ApplicationUser>, IUserRoleStore<ApplicationUser>,
        IUserSecurityStampStore<ApplicationUser>, IQueryableUserStore<ApplicationUser>,
        IAdvancedUserStore<ApplicationUser>, IUserGroupStore<ApplicationUser>
    {
        private JuniorDbConnection _dbConnection;

        private JuniorDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        #region IAdvancedUserStore

        public void AdvancedUpdateAsync(ApplicationUser user, Group[] groups)
        {
            using (var transaction = new TransactionScope())
            {
                UpdateAsync(user);

                var oldGroups = GetGroupsAsync(user.Id);
                var addedGroups = groups.Where(g => !oldGroups.Any(i => i.Id.Equals(g.Id)));
                var removedGroups = oldGroups.Where(g => !groups.Any(i => i.Id.Equals(g.Id)));

                foreach (var group in addedGroups)
                {
                    AddToGroupAsync(user, group.Id);
                }

                foreach (var group in removedGroups)
                {
                    RemoveFromGroupAsync(user, group.Id);
                }

                var oldRoles = GetRolesAsync(user).Result;
                var addedRoles = user.Roles.Where(r => !oldRoles.Contains(r));
                var removedRoles = oldRoles.Where(r => !user.Roles.Contains(r));

                foreach (var role in addedRoles)
                {
                    AddToRoleAsync(user, role);
                }

                foreach (var role in removedRoles)
                {
                    RemoveFromRoleAsync(user, role);
                }

                transaction.Complete();
            }
        }

        #endregion

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
                dbUser.RegistrationDate = DateTime.Now;
                return Task.FromResult(DbConnection.InsertWithIdentity(dbUser));
            }
            DbConnection.Update(dbUser);

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
                .FirstOrDefault(e => e.Id == new Guid(userId));

            return Task.FromResult(Mapper.Map<User, ApplicationUser>(user));
        }

        public Task<ApplicationUser> FindByNameAsync(string userName)
        {
            var user = DbConnection.Users
                .FirstOrDefault(e => e.UserName.Equals(userName));

            return Task.FromResult(
                user != null
                    ? Mapper.Map<User, ApplicationUser>(user)
                    : default(ApplicationUser));
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
            var roles = DbConnection.UserRoles
                    .LoadWith(ur => ur.User)
                    .LoadWith(ur => ur.Role)
                    .Where(ur => ur.UserId.Equals(new Guid(user.Id)))
                    .Select(ur => ur.Role.Name)
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

        public IQueryable<ApplicationUser> Users
        {
            get
            {
                var users = DbConnection.Users
                    .Select(u => u.Map<User, ApplicationUser>());
                foreach (var user in users)
                {
                    user.Roles = GetRolesAsync(user).Result;
                }
                return users;
            }
        }

        #endregion

        #region IUserGroupStore

        public void AddToGroupAsync(ApplicationUser user, Guid groupId)
        {
            if (groupId != null)
            {
                DbConnection.Insert(new UserGroup()
                {
                    UserId = new Guid(user.Id),
                    GroupId = groupId
                });
            }
        }

        public void RemoveFromGroupAsync(ApplicationUser user, Guid groupId)
        {
            var userGroup = DbConnection.UserGroups
                .FirstOrDefault(ug =>
                    ug.UserId.Equals(new Guid(user.Id)) && ug.GroupId.Equals(groupId));

            if (userGroup != null)
            {
                DbConnection.Delete(userGroup);
            }
        }

        public IList<Group> GetGroupsAsync(string userId)
        {
            var groups = DbConnection.UserGroups
                    .LoadWith(ur => ur.Group)
                    .Where(ur => ur.UserId.Equals(new Guid(userId)))
                    .Select(ug => ug.Group)
                    .ToList();

            return groups.Select(Mapper.Map<Group, Group>).ToList();
        }

        public bool IsInGroupAsync(ApplicationUser user, Guid groupId)
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