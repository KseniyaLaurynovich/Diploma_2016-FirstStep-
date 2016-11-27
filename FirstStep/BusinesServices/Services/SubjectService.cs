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
        private IDataRepository _dataRepository;

        public SubjectService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public IList<Subject> GetByUser(string userId)
        {
            var subjects = _dataRepository.Items<Storage.Subject>()
                .Where(subject => subject.UserId.Equals(userId))
                .Select(Mapper.Map<Storage.Subject, Subject>)
                .ToList();

            foreach(var subject in subjects??Enumerable.Empty<Subject>())
            {
                subject.Tasks = _dataRepository.Items<Storage.Task>()
                    .Where(task => task.SubjectId.Equals(subject.Id))
                    .Select(Mapper.Map<Storage.Task, Task>)
                    .ToList();
            }

            return subjects;
        }

        public void Save(Subject subject)
        {
            var storageSubject = Mapper.Map<Subject, Storage.Subject>(subject);
            var id = _dataRepository.Save(storageSubject);

            subject.Id = id;
        }

        public void Delete(string id)
        {
            var deletingSubject = _dataRepository.GetById<Storage.Subject>(id);
            _dataRepository.Delete(deletingSubject);
        }
    }
}
