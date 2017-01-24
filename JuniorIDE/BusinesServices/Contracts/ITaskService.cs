using System.Collections.Generic;
using JI.Services.Models;

namespace JI.Services.Contracts
{
    public interface ITaskService
    {
        Task GetById(string taskId);
        void Save(Task task);
        void Delete(string id);
        IList<Task> GetAll();
    }
}
