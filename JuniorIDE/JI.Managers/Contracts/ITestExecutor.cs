using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface ITestExecutor
    {
        ServiceResult Test(string programPath, string input, string output);
    }
}
