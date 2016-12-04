using LinqToDB;
using LinqToDB.Data;

namespace FirstStep_Storage.Models
{
    internal class FirstStepDb : DataConnection
    {
        public FirstStepDb() : base("FirstStepDb")
        {}

        public ITable<Task> Tasks => GetTable<Task>();
        public ITable<Subject> Subjects => GetTable<Subject>();
        public ITable<Test> Tests => GetTable<Test>();
        public ITable<Group> Groups => GetTable<Group>();
        public ITable<SubjectGroup> SubjectGroup => GetTable<SubjectGroup>();
    }
}
