using JI.Managers.Contracts;
using JI.Managers.Managers;
using JI.Managers.Tools;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace JI.Managers.Infrastructure
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register(typeof(ISubjectManager), typeof(SubjectManager), Lifestyle.Scoped);
            container.Register(typeof(IGroupManager), typeof(GroupManager), Lifestyle.Scoped);
            container.Register(typeof(ITaskManager), typeof(TaskManager), Lifestyle.Scoped);
            container.Register(typeof(IProjectManager), typeof(ProjectManager), Lifestyle.Scoped);
            container.Register(typeof(ITestExecutor), typeof(TestExecutor), Lifestyle.Scoped);
            container.Register(typeof(ICompilator), typeof(CppCompiler), Lifestyle.Scoped);
            container.Register(typeof(IAutoTestedManager), typeof(AutoTestedManager), Lifestyle.Scoped);
            container.Register(typeof(IFileEquatable), typeof(FileEquatable), Lifestyle.Scoped);
            container.Register(typeof(IStatisticManager), typeof(StatisticManager), Lifestyle.Scoped);
            container.Register(typeof(IFileManager), typeof(FileManager), Lifestyle.Scoped);
            container.Register(typeof(IDeadlineManager), typeof(DeadlineManager), Lifestyle.Scoped);
        }
    }
}
