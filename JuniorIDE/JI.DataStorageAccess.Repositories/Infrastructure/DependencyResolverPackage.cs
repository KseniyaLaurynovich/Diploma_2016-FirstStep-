using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Linq2DbRepositories;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace JI.DataStorageAccess.Repositories.Infrastructure
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register(typeof(IAssignRulesRepository), typeof(AssignRulesRepository), Lifestyle.Scoped);
            container.Register(typeof(ICommentsRepository), typeof(CommentsRepository), Lifestyle.Scoped);
            container.Register(typeof(IFilesRepository), typeof(FilesRepository), Lifestyle.Scoped);
            container.Register(typeof(IGroupsRepository), typeof(GroupsRepository), Lifestyle.Scoped);
            container.Register(typeof(IProjectsRepository), typeof(ProjectsRepository), Lifestyle.Scoped);
            container.Register(typeof(ISubjectGroupsRepository), typeof(SubjectGroupsRepository), Lifestyle.Scoped);
            container.Register(typeof(ISubjectsRespository), typeof(SubjectsRespository), Lifestyle.Scoped);
            container.Register(typeof(ITasksRepository), typeof(TasksRepository), Lifestyle.Scoped);
            container.Register(typeof(ITestsRepository), typeof(TestsRepository), Lifestyle.Scoped);
            container.Register(typeof(ITryingsHistoryRepository), typeof(TryingsHistoryRepository), Lifestyle.Scoped);
        }
    }
}
