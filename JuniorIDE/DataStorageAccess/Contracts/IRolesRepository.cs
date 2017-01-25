using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface IRolesRepository : IRepository<Role>
    {
        Role GetByName(string name);
    }
}