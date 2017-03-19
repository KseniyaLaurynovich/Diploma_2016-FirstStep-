using System;
using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using LinqToDB;
using System.Collections.Generic;
using JI.DataStorageAccess.Business.Extensions;
using JI.DataStorageAccess.Linq2DbStores.Base;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class SubjectStore: BaseStore<Subject>, ISubjectStore
    {
        public override Guid Save(Subject task)
        {
            using (var transaction = DbConnection.BeginTransaction())
            {
                task.Id = base.Save(task);

                var oldGroups = GetGroups(task.Id);

                if(task.Groups == null)
                    task.Groups = new List<Group>();

                var addedGroups = task.Groups.Where(g => !oldGroups.Any(i => i.Id.Equals(g.Id)));
                var removedGroups = oldGroups.Where(g => !task.Groups.Any(i => i.Id.Equals(g.Id)));

                foreach (var group in addedGroups)
                {
                    AddToGroup(task, group.Id);
                }

                foreach (var group in removedGroups)
                {
                    RemoveFromGroup(task, group.Id);
                }

                transaction.Commit();
            }
            return task.Id;
        }

        public override IQueryable<Subject> Items
        {
            get
            {
                return DbConnection.Subjects
                    .LoadWith(s => s.SubjectGroups)
                    .LoadWith(s => s.Tasks);
            }
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
            return DbConnection.Subjects
                .Where(s => s.Id.Equals(subjectId))
                .Select(s => s.GetGroups())
                .FirstOrDefault()
                ?.ToList();
        }

        public IQueryable<Subject> FindByUser(Guid userId)
        {
            return from subject in DbConnection.Subjects
                                                .LoadWith(s => s.SubjectGroups)
                                                .LoadWith(s => s.Tasks)
                   where subject.UserId == userId
                   select new Subject(subject)
                   {
                       Groups = subject.GetGroups().ToList()
                   };
        }

        public override Subject FindById(Guid id)
        {
            return (from subject in DbConnection.Subjects
                                                .LoadWith(s => s.SubjectGroups)
                                                .LoadWith(s => s.Tasks)
                   where subject.Id == id
                   select new Subject(subject)
                   {
                       Groups = subject.GetGroups().ToList()
                   })
                   .FirstOrDefault();
        }
    }
}
