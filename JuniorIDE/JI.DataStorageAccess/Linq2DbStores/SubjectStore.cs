using System;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using System.Collections.Generic;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class SubjectStore: BaseStore<Subject>, ISubjectStore
    {
        public void AddToGroup(Subject subject, Guid groupId)
        {
            DbConnection.Insert(new SubjectGroup()
            {
                SubjectId = subject.Id,
                GroupId = groupId
            });
        }

        public void RemoveFromGroup(Subject subject, Guid groupId)
        {
            var userGroup = DbConnection.SubjectGroups
                .FirstOrDefault(sg =>
                    sg.SubjectId.Equals(subject.Id) && sg.GroupId.Equals(groupId));

            if (userGroup != null)
            {
                DbConnection.Delete(userGroup);
            }
        }

        public IList<Group> GetGroups(Guid subjectId)
        {
            return DbConnection.SubjectGroups
                    .LoadWith(sg => sg.Group)
                    .Where(ug => ug.SubjectId.Equals(subjectId))
                    .Select(ug => ug.Group)
                    .ToList();
        }

        public override IQueryable<Subject> Items => DbConnection.Subjects
            .LoadWith(s => s.Tasks)
            .LoadWith(s => s.SubjectGroups);

        public IQueryable<Subject> GetByUser(Guid userId)
        {
            return DbConnection.Subjects
                //todo fix errors
                //.LoadWith(s => s.Tasks)
                //.LoadWith(s => s.SubjectGroups)
                .Where(s => s.UserId.Equals(userId))
                .AsQueryable();
        }
    }
}
