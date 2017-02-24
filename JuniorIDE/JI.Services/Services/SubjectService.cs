using System;
using System.Collections.Generic;
using ExpressMapper;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.Services.Business;
using JI.Services.Contracts;
using JI.Services.Models;
using System.Linq;
using ExpressMapper.Extensions;

namespace JI.Services.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectsRespository _subjectRepository;

        public SubjectService(ISubjectsRespository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public ServiceResult<Subject> Save(Subject subject)
        {
            var validationResult = ValidateSubject(subject);
            if (validationResult.Succeeded)
            {
                var storageSubject = Mapper.Map<Subject, DataStorageAccess.Repositories.Models.Subject>(subject);
                try
                {
                    subject.Id = _subjectRepository.Save(storageSubject);

                    return ServiceResult<Subject>.Success(subject);
                }
                catch (Exception ex)
                {
                    //todo add logging
                    return ServiceResult<Subject>.Failed("Error occured while processing request.");
                }
                
            }

            return validationResult.Convert<Subject>();
        }

        public ServiceResult Delete(string id)
        {
            try
            {
                _subjectRepository.Delete(new Guid(id));
            }
            catch (Exception ex)
            {
                //todo add logging
                return ServiceResult.Failed("Error occured while processing request.");
            }
            return ServiceResult.Success();
        }

        public IList<Subject> GetAll()
        {
            return _subjectRepository.Items()
                .Select(Mapper.Map<DataStorageAccess.Repositories.Models.Subject, Subject>)
                .ToList();
        }

        public Subject FindById(string subjectId)
        {
            return _subjectRepository.GetById(new Guid(subjectId))
                .Map<DataStorageAccess.Repositories.Models.Subject, Subject>();
        }

        public IList<Subject> FindByUserId(string userId)
        {
            return _subjectRepository.GetByUser(new Guid(userId))
                .Select(Mapper.Map<DataStorageAccess.Repositories.Models.Subject, Subject>)
                .ToList();
        }

        public void Dispose()
        {
            _subjectRepository.Dispose();
        }

        private ServiceResult ValidateSubject(Subject subject)
        {
            if (_subjectRepository.Items().Any(s => 
                            s.Name.Equals(subject.Name) 
                            && s.UserId.Equals(subject.UserId)
                            && !s.Id.Equals(subject.Id)))
            {
                return ServiceResult.Failed($"Subject with name {subject.Name} already exists.");
            }

            return ServiceResult.Success();
        }
    }
}
