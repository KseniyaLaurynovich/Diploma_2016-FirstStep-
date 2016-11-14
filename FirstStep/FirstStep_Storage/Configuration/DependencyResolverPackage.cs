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
            container.Register<IDataRepository, DataRepository>(Lifestyle.Scoped);
            container.Register<IStorageProcedureRepository, StorageProcedureRepository>(Lifestyle.Scoped);
        }
    }
}
