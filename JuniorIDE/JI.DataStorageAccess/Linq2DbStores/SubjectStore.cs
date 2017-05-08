using System;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using System.Collections.Generic;
using JI.DataStorageAccess.Linq2DbStores.Base;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class SubjectStore: BaseStore<Subject>, ISubjectStore
    {
        public override Guid Save(Subject obj)
        {
            using (var transaction = DbConnection.BeginTransaction())
            {
                obj.Id = base.Save(obj);

                var newGroups = obj.SubjectGroups.Select(sg => sg.GroupId).ToArray();
                var currentGroups = GetGroups(obj.Id).Select(g => g.Id).ToArray();

                Array.ForEach(newGroups.Except(currentGroups).ToArray(), g =>
                {
                    AddToGroup(obj, g);
                });

                Array.ForEach(currentGroups.Except(newGroups).ToArray(), g =>
                {
                    RemoveFromGroup(obj, g);
                });

                transaction.Commit();
            }
            return obj.Id;
        }

        public override IQueryable<Subject> Items => DbConnection.Subjects
            .LoadWith(s => s.SubjectGroups)
            .LoadWith(s => s.Tasks);

        public void AddToGroup(Subject subject, Guid groupId)
        {
            var groupSubject = new GroupSubject
            {
                SubjectId = subject.Id,
                GroupId = groupId
            };
            DbConnection.InsertWithIdentity(groupSubject);
        }

        public void RemoveFromGroup(Subject subject, Guid groupId)
        {
            DbConnection.GroupSubjects
                .Delete(sg => sg.SubjectId.Equals(subject.Id) && sg.GroupId.Equals(groupId));
        }

        public IList<Group> GetGroups(Guid subjectId)
        {
            return DbConnection.Subjects
                .LoadWith(s => s.SubjectGroups[0].Group)
                .FirstOrDefault(s => s.Id.Equals(subjectId))
                ?.SubjectGroups
                .Select(sg => sg.Group)
                .ToList();
        }

        public IQueryable<Subject> FindByUser(Guid userId)
        {
            return DbConnection.Subjects
                .LoadWith(s => s.SubjectGroups[0].Group)
                .LoadWith(s => s.Tasks)
                .Where(s => s.UserId == userId);
        }

        public override Subject FindById(Guid id)
        {
            return DbConnection.Subjects
                .LoadWith(s => s.SubjectGroups[0].Group)
                .LoadWith(s => s.Tasks)
                .FirstOrDefault(s => s.Id == id);
        }
    }
}
