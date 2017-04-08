using System.IO;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IProjectManager : IManager<Project>
    {
        ServiceResult CreateProjectByStream(Stream projectStream, string userId, string taskId);
    }
}
