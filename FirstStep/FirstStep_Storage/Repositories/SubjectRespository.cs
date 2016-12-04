using System.Collections.Generic;
using System.Linq;
using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    internal class SubjectRespository : DataRepository<Subject>, ISubjectRepository
    {
        public override IQueryable<Subject> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new FirstStepDb())
            {
                return dbConnection.Subjects
                        .LoadWith(s => s.Tasks)
                        .LoadWith(s => s.SubjectGroups);
            }
        }

        public IList<Subject> GetByUser(string userId)
        {
            return Items().Where(s => s.UserId.Equals(userId)).ToList();
        }
    }
}
