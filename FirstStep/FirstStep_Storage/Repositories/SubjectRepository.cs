using FirstStep_Storage.Models;
using System.Linq;

namespace FirstStep_Storage.Repositories
{
    //todo change to internal
    public class SubjectRepository : GenericRepository<Subject>
    {
        public override Subject GetById(int id)
        {
            using (var dbConnection = new FirstStepDb())
            {
                var obj = dbConnection.Subjects.FirstOrDefault(t => t.Id == id);
                return obj;
            }
        }

        public override IQueryable<Subject> Items()
        {
            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.Subjects.AsQueryable();
            }
        }
    }
}
