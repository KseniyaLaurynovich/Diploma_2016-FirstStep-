using System.Linq;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Repositories.Linq2DbRepositories
{
    internal class UserRolesRepository
        : BaseRepository<UserRole>, IUserRolesRepository
    {
        public override IQueryable<UserRole> Items()
        {
            using (var db = new JuniorDbConnection())
            {
                return db.UserRoles
                    .LoadWith(ur => ur.Role)
                    .LoadWith(ur => ur.User)
                    .AsQueryable();
            }
        }
    }
}
