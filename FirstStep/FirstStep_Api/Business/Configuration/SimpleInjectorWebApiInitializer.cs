using System.Web.Http;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using System;
using FirstStep_Api.Business.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Helpers;

namespace FirstStep_Api.App_Start
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
            
            container.Register<ISubjectHelper, SubjectHelper>(Lifestyle.Scoped);
            container.Register<ITaskHelper, TasksHelper>(Lifestyle.Scoped);
        }
    }
}