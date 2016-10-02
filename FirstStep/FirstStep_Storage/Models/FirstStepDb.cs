using LinqToDB;
using LinqToDB.Data;

namespace FirstStep_Storage.Models
{
    internal class FirstStepDb : DataConnection
    {
        public FirstStepDb() : base("FirstStepDb")
        { }

        public ITable<Task> Tasks { get { return GetTable<Task>();  } }
        public ITable<Subject> Subjects { get { return GetTable<Subject>(); } }
    }
}
