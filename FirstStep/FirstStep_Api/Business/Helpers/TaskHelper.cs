using FirstStep_Api.Business.Contracts;
using FirstStep_Storage.Contracts;

namespace FirstStep_Api.Helpers
{
    public class TasksHelper : ITaskHelper
    {
        private readonly IDataRepository _dataRepository;

        public TasksHelper(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }
    }
}