using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Managers.Managers
{
    internal class SubjectManager : ISubjectManager
    {
        private readonly ISubjectStore _subjectStore;

        public SubjectManager(ISubjectStore subjectStore)
        {
            _subjectStore = subjectStore;
        }

        public ServiceResult<Subject> Save(Subject subject)
        {
            var validationResult = ValidateSubject(subject);
            if (validationResult.Succeeded)
            {
                var storageSubject = Mapper.Map<Subject, DataStorageAccess.Models.Subject>(subject);
                try
                {
                    subject.Id = _subjectStore.Save(storageSubject).ToString();

                    return ServiceResult<Subject>.Success(subject);
                }
                catch (Exception ex)
                {
                    //todo add logging
                    return ServiceResult<Subject>.Failed(Resources.Resources.InternalError);
                }

            }

            return validationResult.Convert<Subject>();
        }

        public ServiceResult Delete(string id)
        {
            try
            {
                _subjectStore.Delete(new Guid(id));
            }
            catch (Exception ex)
            {
                //todo add logging
                return ServiceResult.Failed(Resources.Resources.InternalError);
            }
            return ServiceResult.Success;
        }

        public IList<Subject> GetAll()
        {
            var subjects = _subjectStore.Items
                .Select(Mapper.Map<DataStorageAccess.Models.Subject, Subject>)
                .ToList();

            foreach (var subject in subjects)
            {
                subject.Groups = _subjectStore.GetGroups(new Guid(subject.Id))
                    .Select(Mapper.Map<DataStorageAccess.Models.Group, Group>)
                    .ToList();
            }
            return subjects;
        }

        public Subject FindById(string subjectId)
        {
            return _subjectStore.FindById(new Guid(subjectId))
                .Map<DataStorageAccess.Models.Subject, Subject>();
        }

        public IList<Subject> FindByUserId(string userId)
        {
            return GetAll().Where(s => s.UserId.Equals(userId)).ToList();
        }

        public void Dispose()
        {
            _subjectStore.Dispose();
        }

        private ServiceResult ValidateSubject(Subject subject)
        {
            var subjectId = subject.Id != null ? new Guid(subject.Id) : Guid.Empty;
            if (_subjectStore.Items.Any(s =>
                            s.Name.Equals(subject.Name)
                            && s.UserId.Equals(new Guid(subject.UserId))
                            && !s.Id.Equals(subjectId)))
            {
                return ServiceResult.Failed(Resources.Resources.SubjectNameDuplicated(subject.Name));
            }

            return ServiceResult.Success;
        }
    }
}
