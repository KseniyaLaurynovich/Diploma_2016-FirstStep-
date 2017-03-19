using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Managers.Managers
{
    internal class SubjectManager : Manager<Subject, DataStorageAccess.Models.Subject>, ISubjectManager
    {
        public SubjectManager(ISubjectStore store) 
            : base(store)
        {}

        public override IList<Subject> GetAll()
        {
            var subjects = Store.Items
                .Select(Mapper.Map<DataStorageAccess.Models.Subject, Subject>)
                .ToList();

            var subjectStore = Store as ISubjectStore;
            foreach (var subject in subjects)
            {
                subject.Groups = subjectStore?.GetGroups(new Guid(subject.Id))
                    .Select(Mapper.Map<DataStorageAccess.Models.Group, Group>)
                    .ToList();
            }
            return subjects;
        }

        public IList<Subject> FindByUserId(string userId)
        {
            var subjectStore = Store as ISubjectStore;

            if (subjectStore == null)
                return Enumerable.Empty<Subject>().ToList();

            var subjects = subjectStore.FindByUser(new Guid(userId))
                .Select(Mapper.Map<DataStorageAccess.Models.Subject, Subject>)
                .ToList();

            foreach (var subject in subjects)
            {
                subject.Groups = subjectStore.GetGroups(new Guid(subject.Id))
                    .Select(Mapper.Map<DataStorageAccess.Models.Group, Group>)
                    .ToList();
            }
            return subjects;
        }

        #region protected

        protected override ServiceResult Validate(Subject subject)
        {
            var subjectId = subject.Id != null ? new Guid(subject.Id) : Guid.Empty;
            if (Store.Items.Any(s =>
                            s.Name.Equals(subject.Name)
                            && s.UserId.Equals(new Guid(subject.UserId))
                            && !s.Id.Equals(subjectId)))
            {
                return ServiceResult.Failed(Resources.Resources.SubjectNameDuplicated(subject.Name));
            }

            return ServiceResult.Success;
        }

        #endregion
    }
}
