using LinqToDB;
using LinqToDB.Data;

namespace JI.DataStorageAccess.Models
{
    internal class JuniorDbConnection : DataConnection
    {
        public JuniorDbConnection() : base("JuniorDbConnectionString")
        {}

        public ITable<Task> Tasks => GetTable<Task>();
        public ITable<Subject> Subjects => GetTable<Subject>();
        public ITable<Test> Tests => GetTable<Test>();
        public ITable<Group> Groups => GetTable<Group>();
        public ITable<SubjectGroup> SubjectGroup => GetTable<SubjectGroup>();
        public ITable<User> Users => GetTable<User>();
        public ITable<Role> Roles => GetTable<Role>();
        public ITable<UserRole> UserRoles => GetTable<UserRole>();
    }
}
