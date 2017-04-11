using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface IAutoTestedService
    {
        ServiceResult Test(string userId, string taskId);
    }
}
