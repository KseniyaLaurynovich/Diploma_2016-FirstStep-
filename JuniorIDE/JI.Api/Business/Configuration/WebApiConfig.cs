using System.Web.Http;
using Microsoft.Owin.Security.OAuth;

namespace JI.Api.Business.Configuration
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            config.Filters.Add(new AuthorizeAttribute());

            config.MapHttpAttributeRoutes();
        }
    }
}
