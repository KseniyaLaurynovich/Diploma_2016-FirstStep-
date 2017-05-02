using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using Trying = JI.DataStorageAccess.Models.Trying;

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

        public ServiceResult<Models.TryingHistory> Test(string userId, string taskId)
        {
            var taskValidationResult = ValidateTask(taskId);

            if (taskValidationResult.Succeeded)
            {
                var existingProject = _projectStore.FindByTaskAndUser(new Guid(userId), new Guid(taskId));
                _projectStore.SetTestingMode(existingProject.Id, true);

                var projectPath = _projectStore.GetProjectPath(existingProject.Id);

                if (!string.IsNullOrEmpty(projectPath))
                {
                    var trying = new DataStorageAccess.Models.TryingHistory
                    {
                        ProjectId = existingProject.Id,
                        DateTime = DateTime.Now
                    };

                    var compilationResult = _compilator.Compile(projectPath);
                    if (compilationResult.Succeeded)
                    {
                        trying.Compiled = true;
                        trying.Items = new List<Trying>();

                        var exePath = compilationResult.Result;
                        var tests = _testStore.GetPaths(new Guid(taskId));

                        foreach (var test in tests)
                        {
                            var testResult = _testExecutor
                                .Test(exePath, test.InputPath, test.OutputPath);

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
                        trying.Id = _tryingHistoryStore.Save(trying);
                        return ServiceResult<Models.TryingHistory>.Failed(compilationResult.Errors.ToArray());
                    }

                    trying.Id = _tryingHistoryStore.Save(trying);

                    _projectStore.SetTestingMode(existingProject.Id, false);
                    return ServiceResult<Models.TryingHistory>.Success(
                        trying.Map<DataStorageAccess.Models.TryingHistory, Models.TryingHistory>());
                }

                _projectStore.SetTestingMode(existingProject.Id, false);
                return ServiceResult<Models.TryingHistory>.Failed(Resources.Resources.NoProjectExists);
            }

            return taskValidationResult.Convert<Models.TryingHistory>();
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
