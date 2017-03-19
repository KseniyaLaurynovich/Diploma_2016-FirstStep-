using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface ITaskManager : IManager<Task>
    {
        ServiceResult SetVisibility(string taskId, bool isVisible);
        ServiceResult<File> AssociateTestFile(string taskId, File file);
    }
}
