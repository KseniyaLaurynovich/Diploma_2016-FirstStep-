using LinqToDB;
using LinqToDB.Data;

namespace JI.DataStorageAccess.Identity.Models
{
    internal class IdentityDbConnection : DataConnection
    {
        public IdentityDbConnection() : base("JuniorDbConnectionString")
        { }

        public ITable<User> Users => GetTable<User>();
        public ITable<Role> Roles => GetTable<Role>();
        public ITable<UserRole> UserRoles => GetTable<UserRole>();
    }
}
