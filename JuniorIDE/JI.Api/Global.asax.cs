using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using JI.Api.Business.Configuration;
using JI.Common.Contracts.Contracts;

namespace JI.Api
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            Configure();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:3000");

            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                //These headers are handling the "pre-flight" OPTIONS call sent by the browser
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "authorization,Content-Type");

                HttpContext.Current.Response.End();
            }
        }

        protected void Configure()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies()
               .SelectMany(assembly => assembly.GetTypes())
               .Where(type => type.IsClass && typeof(IGlobalConfiguration).IsAssignableFrom(type));

            foreach (var type in types)
            {
                var instance = (IGlobalConfiguration)Activator.CreateInstance(type);
                instance?.Configure();
            }
        }
    }
}
