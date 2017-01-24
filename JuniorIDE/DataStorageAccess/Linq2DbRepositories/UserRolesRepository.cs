using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbRepositories
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
