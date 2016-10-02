using FirstStep_Storage.Models;
using FirstStep_Storage.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace FirstStep_StorageTests
{
    //todo get subject
    [TestClass]
    public class TaskRepository_Test
    {
        private TaskRepository _taskRepository;

        public TaskRepository_Test()
        {
            _taskRepository = new TaskRepository();
        }

        [TestMethod]
        public void AddTask()
        {
            var newSubject = new Task
            {
                CreationDate = DateTime.Now,
                Name = "Subject",
                Description = "description",
                AdditionalInfo = "additional info",
                SubjectId = 1
            };

            _taskRepository.Add(newSubject);

            Assert.IsTrue(newSubject.Id != 0);
        }

        [TestMethod]
        public void UpdateTask()
        {
            var newSubject = new Task
            {
                CreationDate = DateTime.Now,
                Name = "Subject",
                Description = "description",
                AdditionalInfo = "additional info",
                SubjectId = 1
            };
            _taskRepository.Add(newSubject);

            newSubject.Description = "Updated";
            _taskRepository.Update(newSubject);

            var updatedTask = _taskRepository.GetById(newSubject.Id);
            Assert.AreEqual(updatedTask.Description, newSubject.Description);
        }

        [TestMethod]
        public void DeleteTask()
        {
            var newSubject = new Task
            {
                CreationDate = DateTime.Now,
                Name = "Subject",
                Description = "description",
                AdditionalInfo = "additional info",
                SubjectId = 1
            };
            _taskRepository.Add(newSubject);
            _taskRepository.Delete(newSubject);

            var deletedSubject = _taskRepository.GetById(newSubject.Id);
            Assert.AreEqual(deletedSubject, null);
        }

        [TestMethod]
        public void GetTasks()
        {
            var items = _taskRepository.Items().ToList();
            Assert.AreNotEqual(items, null);
        }
    }
}
