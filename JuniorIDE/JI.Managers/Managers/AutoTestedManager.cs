using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
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
        private readonly ITaskStore _taskStore;

        public AutoTestedManager(
            ITestExecutor testExecutor, ICompilator compilator, 
            IProjectStore projectStore, ITestStore testStore,
            ITryingHistoryStore tryingHistoryStore, ITaskStore taskStore)
        {
            _testExecutor = testExecutor;
            _compilator = compilator;
            _projectStore = projectStore;
            _testStore = testStore;
            _tryingHistoryStore = tryingHistoryStore;
            _taskStore = taskStore;
        }

        public ServiceResult<TryingHistory> Test(string userId, string taskId)
        {
            var task = _taskStore.FindById(new Guid(taskId));

            if (!task.AutoTested)
            {
                return ServiceResult<TryingHistory>.Success(null);
            }

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

                    if (task.AutoTested)
                    {
                        var exePath = compilationResult.Result;
                        var tests = _testStore.GetPaths(new Guid(taskId));

                        foreach (var test in tests)
                        {
                            var testResult = _testExecutor
                                .Test(exePath, test.InputPath, test.OutputPath, task.OutputFileName);

                            trying.Items.Add(new Trying
                            {
                                TestId = test.Id,
                                Pass = testResult.Succeeded,
                                Errors = testResult.Errors != null 
                                    ? string.Join(";", testResult.Errors)
                                    : string.Empty
                            });
                        }
                    }
                }
                else
                {
                    trying.Compiled = false;
                    trying.Id = _tryingHistoryStore.Save(trying);
                    return ServiceResult<TryingHistory>.Failed(compilationResult.Errors.ToArray());
                }

                trying.Id = _tryingHistoryStore.Save(trying);

                _projectStore.SetTestingMode(existingProject.Id, false);
                return ServiceResult<TryingHistory>.Success(
                    trying.Map<DataStorageAccess.Models.TryingHistory, TryingHistory>());
            }

            _projectStore.SetTestingMode(existingProject.Id, false);
            return ServiceResult<TryingHistory>.Failed(Resources.Resources.NoProjectExists);
        }

        public void Dispose()
        {
            _projectStore?.Dispose();
            _testStore?.Dispose();
            _tryingHistoryStore?.Dispose();
            _taskStore?.Dispose();
        }
    }
}
