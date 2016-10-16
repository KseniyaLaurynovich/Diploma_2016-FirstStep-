using FirstStep_Api.Business.Contracts;
using FirstStep_Storage.Contracts;
using System.Collections.Generic;

namespace FirstStep_Api.Business.Helpers
{
    public class SubjectsHelper : ISubjectHelper
    {
        private readonly IDataRepository _dataRepository;

        public SubjectsHelper(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public IList<Subject> GetSubject
    }
}