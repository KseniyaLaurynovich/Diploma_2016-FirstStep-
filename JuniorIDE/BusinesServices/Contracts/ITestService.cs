using JI.Services.Models;

namespace JI.Services.Contracts
{
    public interface ITestService
    {
        void Save(Test test);
        void Delete(string id);
        Test[] GetForTask(string taskId);
    }
}
