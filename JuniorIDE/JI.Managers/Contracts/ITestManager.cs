using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface ITestManager
    {
        ServiceResult Test(string programmPath, string input, string output);
    }
}
