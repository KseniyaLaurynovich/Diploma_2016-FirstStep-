using BusinesServices.Models;
using BusinesServices.Contracts;
using ExpressMapper;
using FirstStep_Storage.Contracts;
using System.Collections.Generic;
using System.Linq;
using Storage = FirstStep_Storage.Models;

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
                .Select(Mapper.Map<Storage.Subject, Subject>)
                .ToList();

            foreach(var subject in subjects)
            {
                subject.AssignGroups = _groupRepository
                    .GetGroupsBySubject(subject.Id)
                    .Select(Mapper.Map<Storage.Group, Group>)
                    .ToList();
            }

            return subjects;
        }

        public void Save(Subject subject)
        {
            var storageSubject = Mapper.Map<Subject, Storage.Subject>(subject);
            var id = _subjectRepository.Save(storageSubject);

            subject.Id = id;
        }

        public void Delete(string id)
        {
            var deletingSubject = _subjectRepository.GetById(id);
            _subjectRepository.Delete(deletingSubject);
        }

        
    }
}
