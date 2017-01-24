using JI.UserIdentity.Managers;
using JI.UserIdentity.Models;
using JI.UserIdentity.StoreServices;
using Microsoft.AspNet.Identity;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace JI.UserIdentity.Infrastructure
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register(
                typeof(IUserStore<ApplicationUser>), typeof(ApplicationUserStoreService), Lifestyle.Scoped);

            container.Register(
                typeof(UserManager<ApplicationUser>), typeof(ApplicationUserManager), Lifestyle.Scoped);
        }
    }
}
