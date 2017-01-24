using JI.Api;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]
namespace JI.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureContainer(app);
            ConfigureAuth(app);
            ConfigureMappings(app);
        }
    }
}