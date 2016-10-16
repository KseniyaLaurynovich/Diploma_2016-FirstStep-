using FirstStep_Api.Business.Configuration;
using System.Web.Http;

namespace FirstStep_Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            DependencyResolverConfig.Initialize();
            MapperConfig.Initialize();

            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
