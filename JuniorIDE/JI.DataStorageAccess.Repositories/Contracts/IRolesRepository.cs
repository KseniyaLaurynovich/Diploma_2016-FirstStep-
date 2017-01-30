using JI.DataStorageAccess.Repositories.Models;

namespace JI.DataStorageAccess.Repositories.Contracts
{
    public interface IRolesRepository : IRepository<Role>
    {
        Role GetByName(string name);
    }
}