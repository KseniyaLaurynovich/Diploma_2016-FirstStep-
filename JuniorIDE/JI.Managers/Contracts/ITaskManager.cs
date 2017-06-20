using System.Collections.Generic;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface ITaskManager : IManager<Task>
    {
        IList<Task> GetByGroups(IList<Group> groups);
        ServiceResult SetVisibility(string taskId, bool isVisible);
        ServiceResult<File> AssociateTestFile(string taskId, File file);
        ServiceResult<Task> GetTaskForUser(string currentUserId, string taskId, IList<Group> groups);
        void RemoveExtraFiles(string taskId, string[] filesIds);
        ServiceResult SetMark(string userId, string taskId, int? mark);
    }
}
