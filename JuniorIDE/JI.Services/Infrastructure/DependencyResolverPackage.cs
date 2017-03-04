using JI.Services.Contracts;
using JI.Services.Services;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace JI.Services.Infrastructure
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register(typeof(ISubjectService), typeof(SubjectService), Lifestyle.Scoped);
            container.Register(typeof(IGroupService), typeof(GroupService), Lifestyle.Scoped);
        }
    }
}
