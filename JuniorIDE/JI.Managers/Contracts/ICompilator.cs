using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface ICompilator
    {
        ServiceResult<string> Compile(string projectPath);
    }
}
