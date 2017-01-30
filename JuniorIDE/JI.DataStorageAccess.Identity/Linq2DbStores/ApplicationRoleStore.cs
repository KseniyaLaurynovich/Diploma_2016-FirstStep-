using System;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

using LinqToDB;
using Microsoft.AspNet.Identity;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Repositories.Models;
using JI.DataStorageAccess.Identity.Models;
using JI.Identity.Models;

namespace JI.DataStorageAccess.Identity.Linq2DbStores
{
    public class ApplicationRoleStore 
        : IQueryableRoleStore<ApplicationRole, string>
    {
        public Task CreateAsync(ApplicationRole role)
        {
            return UpdateAsync(role);
        }

        public Task UpdateAsync(ApplicationRole role)
        {
            var dbRole = Mapper.Map<ApplicationRole, Role>(role);

            using (var dbConnection = new IdentityDbConnection())
            {
                if (dbRole.Id == Guid.Empty)
                {
                    return Task.FromResult((string)dbConnection.InsertWithIdentity(dbRole));
                }
                dbConnection.Update(dbRole);
            }

            return Task.FromResult(role.Id);
        }

        public Task DeleteAsync(ApplicationRole role)
        {
            var dbRole = Mapper.Map<ApplicationRole, Role>(role);

            using (var db = new IdentityDbConnection())
            {
                db.Delete(dbRole);
            }

            return Task.FromResult(role.Id);
        }

        public Task<ApplicationRole> FindByIdAsync(string roleId)
        {
            Role role;
            using (var db = new IdentityDbConnection())
            {
                role = db.Roles.FirstOrDefault(e => e.Id == new Guid(roleId));
            }

            return Task.FromResult(
                role == null 
                ? null 
                : Mapper.Map<Role, ApplicationRole>(role));
        }

        public Task<ApplicationRole> FindByNameAsync(string roleName)
        {
            Role role;

            using (var db = new IdentityDbConnection())
            {
                role = db.Roles.FirstOrDefault(e => e.Name.Equals(roleName));
            }

            return Task.FromResult(
                role == null 
                ? null 
                : Mapper.Map<Role, ApplicationRole>(role));
        }

        public IQueryable<ApplicationRole> Roles
        {
            get
            {
                using (var dbConnection = new IdentityDbConnection())
                {
                    return dbConnection.Roles
                        .Select(r => r.Map<Role, ApplicationRole>());
                }
            }
        }

        public void Dispose()
        { }

        
    }
}
