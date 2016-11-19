using FirstStep_Api.Business.Configuration;
using System.Web.Http;
using FirstStep_Api.App_Start;
using FirstStep_Common;
using System;
using System.Linq;
using System.Web;

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

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }

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
