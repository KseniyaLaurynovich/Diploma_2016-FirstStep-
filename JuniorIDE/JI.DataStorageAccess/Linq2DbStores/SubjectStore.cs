using System;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using System.Collections.Generic;
using System.Transactions;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class SubjectStore: BaseStore<Subject>, ISubjectStore
    {
        public override Guid Save(Subject subject)
        {
            using (var transaction = new TransactionScope())
            {
                subject.Id = base.Save(subject);

                var oldGroups = GetGroups(subject.Id);
                var addedGroups = subject.Groups.Where(g => !oldGroups.Any(i => i.Id.Equals(g.Id)));
                var removedGroups = oldGroups.Where(g => !subject.Groups.Any(i => i.Id.Equals(g.Id)));

                foreach (var group in addedGroups)
                {
                    AddToGroup(subject, group.Id);
                }

                foreach (var group in removedGroups)
                {
                    RemoveFromGroup(subject, group.Id);
                }

                transaction.Complete();
            }
            return subject.Id;
        }

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

        public IQueryable<Subject> FindByUser(Guid userId)
        {
            return Items.Where(s => s.UserId.Equals(userId));
        }

        public override Subject FindById(Guid id)
        {
            return DbConnection.Subjects
                .LoadWith(s => s.Tasks)
                .FirstOrDefault(s => s.Id.Equals(id));
        }
    }
}
