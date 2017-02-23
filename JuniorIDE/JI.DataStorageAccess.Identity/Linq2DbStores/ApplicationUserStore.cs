﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using JI.DataStorageAccess.Identity.Models;
using LinqToDB;
using Microsoft.AspNet.Identity;
using Task = System.Threading.Tasks.Task;
using System.Transactions;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Identity.Contracts;
using JI.DataStorageAccess.Repositories.Models;
using JI.Identity.Models;

namespace JI.DataStorageAccess.Identity.Linq2DbStores
{
    public class ApplicationUserStore 
        : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>, 
        IUserEmailStore<ApplicationUser>, IUserRoleStore<ApplicationUser>,
        IUserSecurityStampStore<ApplicationUser>, IQueryableUserStore<ApplicationUser>,
        IUpdateUserStore<ApplicationUser>
    {
        private IdentityDbConnection _dbConnection;

        private IdentityDbConnection DbConnection
            => _dbConnection ?? (_dbConnection = new IdentityDbConnection());

        #region IUpdateUserStore

        public Task UpdateWithRolesAsync(ApplicationUser user, string[] addedRoles, string[] removedRoles)
        {
            using (var transaction = new TransactionScope())
            {
                UpdateAsync(user);

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
            return Task.FromResult(0);
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

        public IQueryable<ApplicationUser> Users => DbConnection.Users
            .Select(u => u.Map<User, ApplicationUser>());

        #endregion

        public void Dispose()
        {
            _dbConnection?.Dispose();   
        }
    }
}