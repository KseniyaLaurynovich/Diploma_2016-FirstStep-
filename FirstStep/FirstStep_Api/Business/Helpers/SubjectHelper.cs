using ExpressMapper;
using FirstStep_Api.Business.Contracts;
using FirstStep_Api.Business.Services;
using FirstStep_Api.Models;
using FirstStep_Storage.Contracts;
using System.Collections.Generic;
using System.Linq;

using Storage = FirstStep_Storage.Models;

namespace FirstStep_Api.Business.Helpers
{
    public class SubjectHelper : ISubjectHelper
    {
        private readonly IDataRepository _dataRepository;

        public SubjectHelper(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public IList<Subject> GetSubjectsForUser(int userId)
        {
            return _dataRepository
                .Items<Storage.Subject>()
                .Select(s => MapperService.Map<Storage.Subject, Subject>(s))
                .ToList();
        }

        public int Save(Subject subject)
        {
            return _dataRepository.Save(Mapper.Map<Subject, Storage.Subject>(subject));
        }

        public void Delete(int subjectId)
        {
            _dataRepository.Delete<Storage.Subject>()
        }
    }
}