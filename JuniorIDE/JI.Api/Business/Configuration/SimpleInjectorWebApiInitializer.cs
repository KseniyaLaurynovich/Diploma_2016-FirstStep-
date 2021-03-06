using System;
using System.Web.Http;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace JI.Api.Business.Configuration
{
    public static class SimpleInjectorWebApiInitializer
    {
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }

        private static void InitializeContainer(Container container)
        {
            container.RegisterPackages(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}