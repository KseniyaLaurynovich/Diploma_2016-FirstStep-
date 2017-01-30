using System;
using System.Collections.Generic;
using BusinesServices.Models;
using BusinesServices.Contracts;
using ExpressMapper;
using System.Linq;
using DataStorageAccess.Contracts;
using ExpressMapper.Extensions;

namespace BusinesServices.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public void Delete(string id)
        {
            var deletingTask = _taskRepository.GetById(id);
            _taskRepository.Delete(deletingTask);
        }

        public IList<Task> GetAll()
        {
            return _taskRepository.Items().Select(t => t.Map<DataStorageAccess.Models.Task, Task>()).ToList();
        }

        public Task GetById(string id)
        {
            return Mapper.Map<DataStorageAccess.Models.Task, Task>(
                _taskRepository.GetById(id)); ;
        }

        public void Save(Task task)
        {
            var storageTask = Mapper.Map<Task, DataStorageAccess.Models.Task>(task);
            storageTask.CreationDate = DateTime.Now;
            var id = _taskRepository.Save(storageTask);

            task.Id = id;
            task.CreationDate = storageTask.CreationDate;
        }
    }
}
