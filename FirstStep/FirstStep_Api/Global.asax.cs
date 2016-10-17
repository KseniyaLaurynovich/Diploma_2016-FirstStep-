using FirstStep_Api.Business.Configuration;
using System.Web.Http;
using FirstStep_Api.App_Start;

namespace FirstStep_Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            MapperConfig.Initialize();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            SimpleInjectorWebApiInitializer.Initialize();
        }
    }
}
