using System.Collections.Generic;
using System.Linq;
using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    public class TaskRepository : DataRepository<Task>, ITaskRepository
    {
        public override IList<Task> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            IList<Task> result; 
            using (var dbConnection = new FirstStepDb())
            {
                result = dbConnection.Tasks
                    .LoadWith(t => t.Tests)
                    .ToList();
            }
            return result;
        }
    }
}
