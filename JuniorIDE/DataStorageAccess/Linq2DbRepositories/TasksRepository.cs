using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbRepositories
{
    internal class TasksRepository 
        : BaseRepository<Task>, ITasksRepository
    {
        public override IQueryable<Task> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new JuniorDbConnection())
            {
                return dbConnection.Tasks
                    .LoadWith(t => t.Tests)
                    .AsQueryable();
            }
        }
    }
}
