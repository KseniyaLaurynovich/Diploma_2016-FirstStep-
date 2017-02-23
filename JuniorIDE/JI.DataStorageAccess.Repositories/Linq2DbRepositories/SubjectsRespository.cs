using System;
using System.Linq;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Repositories.Linq2DbRepositories
{
    internal class SubjectsRespository
        : BaseRepository<Subject>, ISubjectsRespository
    {
       public override IQueryable<Subject> Items()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            return DbConnection.Subjects
                .LoadWith(s => s.Tasks)
                .LoadWith(s => s.SubjectGroups)
                .AsQueryable();
        }

        public IQueryable<Subject> GetByUser(Guid userId)
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;

            return DbConnection.Subjects
                //todo fix errors
                //.LoadWith(s => s.Tasks)
                //.LoadWith(s => s.SubjectGroups)
                .Where(s => s.UserId.Equals(userId))
                .AsQueryable();
        }
    }
}
