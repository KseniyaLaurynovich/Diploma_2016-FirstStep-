using System.Linq;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Models;

namespace JI.DataStorageAccess.Repositories.Linq2DbRepositories
{
    internal class RolesRepository
        : BaseRepository<Role>, IRolesRepository
    {
        public Role GetByName(string name)
        {
            using (var db = new JuniorDbConnection())
            {
                return db.Roles.FirstOrDefault(r => r.Name.Equals(name));
            }
        }
    }
}
