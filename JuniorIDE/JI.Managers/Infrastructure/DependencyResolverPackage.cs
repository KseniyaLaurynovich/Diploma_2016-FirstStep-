using JI.Managers.Contracts;
using JI.Managers.Managers;
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
        }
    }
}
