using BusinesServices.Models;
using BusinesServices.Contracts;
using ExpressMapper;
using System.Collections.Generic;
using System.Linq;
using DataStorageAccess.Contracts;
using ExpressMapper.Extensions;

namespace BusinesServices.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepository;
        private readonly IGroupRepository _groupRepository;

        public SubjectService(ISubjectRepository subjectRepository, 
            IGroupRepository groupRepository)
        {
            _subjectRepository = subjectRepository;
            _groupRepository = groupRepository;
        }

        public IList<Subject> GetByUser(string userId)
        {
            var subjects = _subjectRepository.GetByUser(userId)
                .Select(Mapper.Map<DataStorageAccess.Models.Subject, Subject>)
                .ToList();

            foreach(var subject in subjects)
            {
                subject.AssignGroups = _groupRepository
                    .GetGroupsBySubject(subject.Id)
                    .Select(Mapper.Map<DataStorageAccess.Models.Group, Group>)
                    .ToList();
            }

            return subjects;
        }

        public void Save(Subject subject)
        {
            var storageSubject = Mapper.Map<Subject, DataStorageAccess.Models.Subject>(subject);
            var id = _subjectRepository.Save(storageSubject);

            subject.Id = id;
        }

        public void Delete(string id)
        {
            var deletingSubject = _subjectRepository.GetById(id);
            _subjectRepository.Delete(deletingSubject);
        }

        public IList<Subject> GetAll()
        {
            var subjects = _subjectRepository.Items()
                .Select(Mapper.Map<DataStorageAccess.Models.Subject, Subject>)
                .ToList();
            foreach (var subject in subjects)
            {
                subject.AssignGroups = _groupRepository
                    .GetGroupsBySubject(subject.Id)
                    .Select(Mapper.Map<DataStorageAccess.Models.Group, Group>)
                    .ToList();
            }

            return subjects;
        }

        public Subject GetById(string subjectId)
        {
            return _subjectRepository.GetById(subjectId).Map<DataStorageAccess.Models.Subject, Subject>();
        }
    }
}
