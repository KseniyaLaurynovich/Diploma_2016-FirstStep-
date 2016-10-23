using ExpressMapper;
using FirstStep_Api.Business.Contracts;
using FirstStep_Api.Models;
using FirstStep_Storage.Contracts;
using System.Collections.Generic;
using System.Linq;
using Storage = FirstStep_Storage.Models;

namespace FirstStep_Api.Helpers
{
    public class TasksHelper : ITaskHelper
    {
        private readonly IDataRepository _dataRepository;

        public TasksHelper(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public IList<Task> GetBySubjectId(int subjectId)
        {
            return _dataRepository
                .Items<Storage.Task>()
                .Where(t => t.SubjectId == subjectId)
                .Select(t => Mapper.Map<Storage.Task, Task>(t))
                .ToList();
        }
    }
}