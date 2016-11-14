using BusinesServices.Contracts;
using BusinesServices.Services;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace FirstStep_Storage.Configuration
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<ISubjectService, SubjectService>(Lifestyle.Scoped);
            container.Register<ITaskService, TaskService>(Lifestyle.Scoped);
            container.Register<IFileService, FileService>(Lifestyle.Scoped);
        }
    }
}
