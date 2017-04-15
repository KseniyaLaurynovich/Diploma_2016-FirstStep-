using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface IAutoTestedManager
    {
        ServiceResult Test(string userId, string taskId);
    }
}
