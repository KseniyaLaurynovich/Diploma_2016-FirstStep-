using BusinesServices.Models;

namespace BusinesServices.Contracts
{
    public interface ITestService
    {
        void Save(Test test);
        void Delete(string id);
        Test[] GetForTask(string taskId);
    }
}
