using System;
using System.Collections.Generic;
using BusinesServices.Models;
using BusinesServices.Contracts;
using FirstStep_Storage.Contracts;
using Storage = FirstStep_Storage.Models;
using ExpressMapper;
using System.Linq;

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

        public Task GetById(string id)
        {
            return Mapper.Map<Storage.Task, Task>(
                _taskRepository.GetById(id)); ;
        }

        public void Save(Task task)
        {
            var storageTask = Mapper.Map<Task, Storage.Task>(task);
            storageTask.CreationDate = DateTime.Now;
            var id = _taskRepository.Save(storageTask);

            task.Id = id;
            task.CreationDate = storageTask.CreationDate;
        }
    }
}
