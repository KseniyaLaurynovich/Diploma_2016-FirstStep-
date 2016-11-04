using FirstStep_Api.Business.Configuration;
using System.Web.Http;
using FirstStep_Api.App_Start;
using FirstStep_Common;
using System;
using System.Linq;

namespace FirstStep_Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            RegisterMappers();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            SimpleInjectorWebApiInitializer.Initialize();
        }

        #region Helpers

        public void RegisterMappers()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(assembly => assembly.GetTypes())
                .Where(type => type.IsClass && typeof(IMapperRegistration).IsAssignableFrom(type));

            foreach (var type in types)
            {
                var instance = (IMapperRegistration)Activator.CreateInstance(type);
                instance?.Register();
            }
        }

        #endregion
    }
}
