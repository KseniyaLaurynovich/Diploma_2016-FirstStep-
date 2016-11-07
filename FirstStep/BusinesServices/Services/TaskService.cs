using System;
using System.Collections.Generic;
using BusinesModels;
using BusinesServices.Contracts;
using FirstStep_Storage.Contracts;
using Storage = FirstStep_Storage.Models;
using ExpressMapper;

namespace BusinesServices.Services
{
    public class TaskService : ITaskService
    {
        private IDataRepository _dataRepository;

        public TaskService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public void Delete(string id)
        {
            var deletingTask = _dataRepository.GetById<Storage.Task>(id);
            _dataRepository.Delete(deletingTask);
        }

        public Task GetById(string id)
        {
            return Mapper.Map<Storage.Task, Task>(_dataRepository.GetById<Storage.Task>(id));
        }

        public void Save(Task task)
        {
            var storageTask = Mapper.Map<Task, Storage.Task>(task);
            storageTask.CreationDate = DateTime.Now;
            var id = _dataRepository.Save(storageTask);

            task.Id = id;
            task.CreationDate = storageTask.CreationDate;
        }
    }
}
