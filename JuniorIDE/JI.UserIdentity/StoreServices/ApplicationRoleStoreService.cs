using System;
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
    internal class ApplicationRoleStoreService : IRoleStore<ApplicationRole, string>
    {
        private readonly IRolesRepository _rolesRepository;

        public ApplicationRoleStoreService(IRolesRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        public Task CreateAsync(ApplicationRole role)
        {
            return UpdateAsync(role);
        }

        public Task UpdateAsync(ApplicationRole role)
        {
            var id = _rolesRepository.Save(Mapper.Map<ApplicationRole, Role>(role));
            return Task.FromResult(id);
        }

        public Task DeleteAsync(ApplicationRole role)
        {
            _rolesRepository.Delete(new Guid(role.Id));
            return Task.FromResult(role.Id);
        }

        public Task<ApplicationRole> FindByIdAsync(string roleId)
        {
            var role = _rolesRepository.GetById(new Guid(roleId));
            return Task.FromResult(role == null ? null : Mapper.Map<Role, ApplicationRole>(role));
        }

        public Task<ApplicationRole> FindByNameAsync(string roleName)
        {
            var role = _rolesRepository.Items().FirstOrDefault(i => i.Name.Equals(roleName));

            return Task.FromResult(role == null ? null : Mapper.Map<Role, ApplicationRole>(role));
        }

        public void Dispose()
        { }
    }
}
