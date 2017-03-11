using System;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Models;
using JI.Identity.Models;
using LinqToDB;
using Microsoft.AspNet.Identity;
using Task = System.Threading.Tasks.Task;

namespace JI.DataStorageAccess.Linq2DbStores.Identity
{
    internal class ApplicationRoleStore 
        : IQueryableRoleStore<ApplicationRole, string>
    {
        private JuniorDbConnection _dbConnection;

        private JuniorDbConnection DbConnection 
            => _dbConnection ?? (_dbConnection = new JuniorDbConnection());

        public Task CreateAsync(ApplicationRole role)
        {
            return UpdateAsync(role);
        }

        public Task UpdateAsync(ApplicationRole role)
        {
            var dbRole = Mapper.Map<ApplicationRole, Role>(role);

            if (dbRole.Id == Guid.Empty)
            {
                return Task.FromResult((string)DbConnection.InsertWithIdentity(dbRole));
            }
            DbConnection.Update(dbRole);

            return Task.FromResult(role.Id);
        }

        public Task DeleteAsync(ApplicationRole role)
        {
            var dbRole = Mapper.Map<ApplicationRole, Role>(role);
            DbConnection.Delete(dbRole);

            return Task.FromResult(role.Id);
        }

        public Task<ApplicationRole> FindByIdAsync(string roleId)
        {
            var role = DbConnection.Roles
                .FirstOrDefault(e => e.Id == new Guid(roleId));

            return Task.FromResult(
                role == null 
                ? null 
                : Mapper.Map<Role, ApplicationRole>(role));
        }

        public Task<ApplicationRole> FindByNameAsync(string roleName)
        {
            var role = DbConnection.Roles
                .FirstOrDefault(e => e.Name.Equals(roleName));

            return Task.FromResult(
                role == null 
                ? null 
                : Mapper.Map<Role, ApplicationRole>(role));
        }

        public IQueryable<ApplicationRole> Roles => DbConnection.Roles
            .Select(r => r.Map<Role, ApplicationRole>());

        public void Dispose()
        {
            _dbConnection?.Dispose();
        }
    }
}
