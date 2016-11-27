using BusinesServices.Models;
using System.Collections.Generic;

namespace BusinesServices.Contracts
{
    public interface ITaskService
    {
        Task GetById(string taskId);
        void Save(Task task);
        void Delete(string id);
    }
}
