using FirstStep_Storage.Contracts;
using FirstStep_Storage.Repositories;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace FirstStep_Storage.Configuration
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register<IFileRepository, FileRepository>(Lifestyle.Scoped);
            container.Register<ITestRepository, TestRepository>(Lifestyle.Scoped);
            container.Register<ISubjectRepository, SubjectRespository>(Lifestyle.Scoped);
            container.Register<ITaskRepository, TaskRepository>(Lifestyle.Scoped);
            container.Register<IGroupRepository, GroupRepository>(Lifestyle.Scoped);
            container.Register<ISubjectGroupRepository, SubjectGroupRepository>(Lifestyle.Scoped);
            container.Register<IStorageProcedureRepository, StorageProcedureRepository>(Lifestyle.Scoped);
        }
    }
}
