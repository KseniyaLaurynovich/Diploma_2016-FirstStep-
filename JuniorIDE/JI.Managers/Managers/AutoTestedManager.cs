using System;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Managers.Managers
{
    internal class AutoTestedManager : IAutoTestedManager
    {
        private readonly ITestExecutor _testExecutor;
        private readonly ICompilator _compilator;
        private readonly IProjectStore _projectStore;
        private readonly ITestStore _testStore;
        private readonly ITryingHistoryStore _tryingHistoryStore;

        public AutoTestedManager(
            ITestExecutor testExecutor, ICompilator compilator, 
            IProjectStore projectStore, ITestStore testStore,
            ITryingHistoryStore tryingHistoryStore)
        {
            _testExecutor = testExecutor;
            _compilator = compilator;
            _projectStore = projectStore;
            _testStore = testStore;
            _tryingHistoryStore = tryingHistoryStore;
        }

        public ServiceResult<TestResult> Test(string userId, string taskId)
        {
            var taskValidationResult = ValidateTask(taskId);

            if (taskValidationResult.Succeeded)
            {
                var projectPath = _projectStore.GetProjectPath(new Guid(userId), new Guid(taskId));

                if (!string.IsNullOrEmpty(projectPath))
                {
                    var trying = new TryingHistory
                    {
                        ProjectId = _projectStore
                            .FindByTaskAndUser(new Guid(userId), new Guid(taskId))
                            .Id,
                        DateTime = DateTime.Now
                    };

                    var compilationResult = _compilator.Compile(projectPath);
                    if (compilationResult.Succeeded)
                    {
                        trying.Compiled = true;

                        var exePath = compilationResult.Result;
                        var tests = _testStore.GetPaths(new Guid(taskId));

                        foreach (var test in tests)
                        {
                            var testResult = _testExecutor.Test(exePath, test.InputPath, test.OutputPath);

                            trying.Items.Add(new Trying
                            {
                                TestId = test.Id,
                                Pass = testResult.Succeeded,
                                Errors = string.Join(";", testResult.Errors)
                            });
                        }
                    }
                    else
                    {
                        trying.Compiled = false;
                    }

                    trying.Id = _tryingHistoryStore.Save(trying);

                    return ServiceResult<TestResult>.Success(
                        trying.Map<TryingHistory, TestResult>());
                }

                //TODO move to resources
                return ServiceResult<TestResult>.Failed("No uploaded project for this task");
            }

            return taskValidationResult.Convert<TestResult>();
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
