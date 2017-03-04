using LinqToDB;
using LinqToDB.Data;

namespace JI.DataStorageAccess.Repositories.Models
{
    public class JuniorDbConnection : DataConnection
    {
        public JuniorDbConnection() : base("JuniorDbConnectionString")
        {}

        public ITable<Subject> Subjects => GetTable<Subject>();
        public ITable<Group> Groups => GetTable<Group>();
        public ITable<Task> Tasks => GetTable<Task>();
    }
}
