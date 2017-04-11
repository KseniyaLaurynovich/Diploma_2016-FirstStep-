using System;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;

namespace JI.Managers.Managers
{
    internal class AutoTestedManager : IAutoTestedManager
    {
        private readonly ITestManager _testManager;
        private readonly ICompilator _compilator;

        private readonly IProjectStore _projectStore;
        private readonly ITestStore _testStore;

        public AutoTestedManager(
            ITestManager testManager, ICompilator compilator, 
            IProjectStore projectStore, ITestStore testStore)
        {
            _testManager = testManager;
            _compilator = compilator;
            _projectStore = projectStore;
            _testStore = testStore;
        }

        public ServiceResult Test(string userId, string taskId)
        {
            var taskValidationResult = ValidateTask(taskId);

            if (taskValidationResult.Succeeded)
            {
                var projectPath = _projectStore.GetProjectPath(userId, taskId);

                if (!string.IsNullOrEmpty(projectPath))
                {
                    var compilationResult = _compilator.Compile(projectPath);
                    if (compilationResult.Succeeded)
                    {
                        var exePath = compilationResult.Result;
                        var tests = _testStore.FindByTask(new Guid(taskId));

                        foreach (var test in tests)
                        {
                            var testResult = _testManager.Test(exePath, "", "");
                            //TODO save testresult
                            if (!testResult.Succeeded)
                            {
                                return testResult;
                            }
                        }

                        //TODO save success result
                        //TODO return 
                    }

                    return compilationResult;
                }

                //TODO move to resources
                return ServiceResult.Failed("No uploaded project for this task");
            }

            return taskValidationResult;
        }

        #region protected

        protected ServiceResult ValidateTask(string taskId)
        {
            //TODO check is task is auto tested
            return ServiceResult.Success;
        }

        #endregion
    }
}
