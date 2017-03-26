using LinqToDB;
using LinqToDB.Data;

namespace JI.DataStorageAccess.Models
{
    public class JuniorDbConnection : DataConnection
    {
        public JuniorDbConnection() : base("JuniorDbConnectionString")
        {}

        public ITable<User> Users => GetTable<User>();
        public ITable<Role> Roles => GetTable<Role>();
        public ITable<UserRole> UserRoles => GetTable<UserRole>();
        public ITable<UserGroup> UserGroups => GetTable<UserGroup>();
        public ITable<SubjectGroup> SubjectGroups => GetTable<SubjectGroup>();
        public ITable<Subject> Subjects => GetTable<Subject>();
        public ITable<Group> Groups => GetTable<Group>();
        public ITable<Task> Tasks => GetTable<Task>();
        public ITable<File> Files => GetTable<File>();
        public ITable<Test> Tests => GetTable<Test>();
        public ITable<TaskDeadline> TaskDeadlines => GetTable<TaskDeadline>();
        public ITable<GroupSubject> GroupSubjects => GetTable<GroupSubject>();
    }
}
