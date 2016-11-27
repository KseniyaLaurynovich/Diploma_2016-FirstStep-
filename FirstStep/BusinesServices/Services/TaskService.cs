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
            var task = Mapper.Map<Storage.Task, Task>(_dataRepository.GetById<Storage.Task>(id));

            var groupsIds = 
                _dataRepository.Items<Storage.UserTask>().Where(g => g.TaskId.Equals(id)).Select(t => t.Id).ToList();
            task.Groups = Mapper.Map<IList<Storage.Group>, IList<Group>>(
                _dataRepository.Items<Storage.Group>().Where(g => groupsIds.Contains(g.Id)).ToList());

            var testsIds =
                            _dataRepository.Items<Storage.Test>().Where(g => g.TaskId.Equals(id)).Select(t => t.Id).ToList();
            task.Tests = Mapper.Map<IList<Storage.Test>, IList<Test>>(
                _dataRepository.Items<Storage.Test>().Where(g => testsIds.Contains(g.Id)).ToList());

            return task;
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
