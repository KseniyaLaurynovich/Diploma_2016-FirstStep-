using FirstStep_Storage.Models;
using FirstStep_Storage.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace FirstStep_StorageTests
{
    [TestClass]
    public class TestRepository_Test
    {
        private TestRepository _testRepository;

        public TestRepository_Test()
        {
            _testRepository = new TestRepository();
        }

        [TestMethod]
        public void AddTest()
        {
            var newTest = new Test
            {
                TaskId = 1,
                Name = "Test",
                InputArguments = "fsdf dsfs sdfas",
                OutputArguments = "fdsafdfasdf"
            };

            _testRepository.Add(newTest);
            Assert.IsTrue(newTest.Id > 0);

            _testRepository.Delete(newTest);
        }

        [TestMethod]
        public void UpdateSubject()
        {
            var newTest = new Test
            {
                TaskId = 1,
                Name = "Test",
                InputArguments = "fsdf dsfs sdfas",
                OutputArguments = "fdsafdfasdf"
            };
            _testRepository.Add(newTest);

            newTest.Name = "Updated";
            _testRepository.Update(newTest);

            var updatedTest = _testRepository.GetById(newTest.Id);

            Assert.AreEqual(newTest.Name, updatedTest.Name);

            _testRepository.Delete(newTest);
        }

        [TestMethod]
        public void DeleteSubject()
        {
            var newTest = new Test
            {
                TaskId = 1,
                Name = "Test",
                InputArguments = "fsdf dsfs sdfas",
                OutputArguments = "fdsafdfasdf"
            };
            _testRepository.Add(newTest);
            _testRepository.Delete(newTest);

            var deletedSubject = _testRepository.GetById(newTest.Id);

            Assert.AreEqual(deletedSubject, null);
        }

        [TestMethod]
        public void GetSubjectById()
        {
            var newTest = new Test
            {
                TaskId = 1,
                Name = "Test",
                InputArguments = "fsdf dsfs sdfas",
                OutputArguments = "fdsafdfasdf"
            };
            _testRepository.Add(newTest);

            var subject = _testRepository.GetById(newTest.Id);
            Assert.AreNotEqual(subject, null);

            _testRepository.Delete(newTest);
        }

        [TestMethod]
        public void GetSubjects()
        {
            var items = _testRepository.Items().ToList();
            Assert.AreNotEqual(items, null);
        }
    }
}
