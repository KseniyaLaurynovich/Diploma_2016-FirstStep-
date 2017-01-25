using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbRepositories
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
