using System.Collections.Generic;
using System.Linq;
using FirstStep_Storage.Contracts;
using FirstStep_Storage.Helpers;
using FirstStep_Storage.Models;

namespace FirstStep_Storage.Repositories
{
    public class GroupRepository: DataRepository<Group>, IGroupRepository
    {
        public IList<Group> GetGroupsBySubject(string subjectId)
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;
            IList<Group> result;
            using (var db = new FirstStepDb())
            {
                result =
                (
                    from s in db.Subjects
                    where s.Id.Equals(subjectId)
                    select s.GetGroups()
                )
                .FirstOrDefault()
                ?.ToList();
            }


            return result;
        }
    }
}
