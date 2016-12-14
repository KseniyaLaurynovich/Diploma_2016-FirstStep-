using System.Linq;
using BusinesServices.Contracts;
using BusinesServices.Models;
using ExpressMapper.Extensions;
using FirstStep_Storage.Repositories;

namespace BusinesServices.Services
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;

        public TestService(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }

        public void Save(Test test)
        {
            var id = _testRepository.Save(test.Map<Test, FirstStep_Storage.Models.Test>());
            test.Id = id;
        }

        public void Delete(string id)
        {
            var test = _testRepository.GetById(id);

            if (test != null)
            {
                _testRepository.Delete(test);
            }
        }

        public Test[] GetForTask(string taskId)
        {
            return _testRepository
                .Items()
                .Where(t => t.TaskId.Equals(taskId))
                .Select(i => i.Map<FirstStep_Storage.Models.Test, Test>())
                .ToArray();
        }
    }
}
