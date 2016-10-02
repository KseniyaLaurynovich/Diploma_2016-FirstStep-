using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using FirstStep_Storage.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace FirstStep_StorageTests
{

    //todo get subject with tasks
    [TestClass]
    public class SubjectRepository_Test
    {
        private SubjectRepository _subjectRepository;

        public SubjectRepository_Test()
        {
            _subjectRepository = new SubjectRepository();
        }

        [TestMethod]
        public void AddSubject()
        {
            var newSubject = new Subject
            {
                Name = "Test",
                CreationDate = DateTime.Now,
                Description = "description"
            };

            _subjectRepository.Add(newSubject);
            Assert.IsTrue(newSubject.Id > 0);

            _subjectRepository.Delete(newSubject);
        }

        [TestMethod]
        public void UpdateSubject()
        {
            var newSubject = new Subject
            {
                Name = "Test",
                CreationDate = DateTime.Now,
                Description = "description"
            };
            _subjectRepository.Add(newSubject);

            newSubject.Description = "Updated";
            _subjectRepository.Update(newSubject);

            var updatedSubject = _subjectRepository.GetById(newSubject.Id);

            Assert.AreEqual(newSubject.Description, updatedSubject.Description);

            _subjectRepository.Delete(newSubject);
        }

        [TestMethod]
        public void DeleteSubject()
        {
            var newSubject = new Subject
            {
                Name = "Test",
                CreationDate = DateTime.Now,
                Description = "description"
            };
            _subjectRepository.Add(newSubject);
            _subjectRepository.Delete(newSubject);

            var deletedSubject = _subjectRepository.GetById(newSubject.Id);

            Assert.AreEqual(deletedSubject, null);
        }

        [TestMethod]
        public void GetSubjectById()
        {
            var newSubject = new Subject
            {
                Name = "Test",
                CreationDate = DateTime.Now,
                Description = "description"
            };
            _subjectRepository.Add(newSubject);

            var subject = _subjectRepository.GetById(newSubject.Id);
            Assert.AreNotEqual(subject, null);

            _subjectRepository.Delete(newSubject);
        }

        [TestMethod]
        public void GetSubjects()
        {
            var items = _subjectRepository.Items().ToList();
            Assert.AreNotEqual(items, null);
        }
    }
}
