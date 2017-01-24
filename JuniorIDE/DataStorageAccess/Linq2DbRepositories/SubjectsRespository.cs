using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbRepositories
{
    internal class SubjectsRespository
        : BaseRepository<Subject>, ISubjectsRespository
    {
       public override IQueryable<Subject> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            using (var dbConnection = new JuniorDbConnection())
            {
                return dbConnection.Subjects
                    .LoadWith(s => s.Tasks)
                    .LoadWith(s => s.SubjectGroups)
                    .AsQueryable();
            }
        }
    }
}
