using FirstStep_Storage.Models;
using System.Linq;

namespace FirstStep_Storage.Repositories
{
    //todo change to internal
    public class TaskRepository : GenericRepository<Task>
    {
        public override Task GetById(int id)
        {
            using (var dbConnection = new FirstStepDb())
            {
                var obj = dbConnection.Tasks.FirstOrDefault(t => t.Id == id);
                return obj;
            }
        }

        public override IQueryable<Task> Items()
        {
            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.Tasks.AsQueryable();
            }
        }
    }
}
