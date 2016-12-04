using System.Linq;
using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    public class TaskRepository : DataRepository<Task>, ITaskRepository
    {
        public override IQueryable<Task> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.Tasks
                    .LoadWith(t => t.Tests);
            }
        }
    }
}
