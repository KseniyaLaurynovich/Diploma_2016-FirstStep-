using System;
using System.Linq;
using System.Web.Http;
using JI.Api;
using JI.Common.Mapper.Contracts;
using JI.UserIdentity.Managers;
using JI.UserIdentity.Models;
using JI.UserIdentity.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SimpleInjector;
using SimpleInjector.Extensions.ExecutionContextScoping;
using SimpleInjector.Integration.WebApi;

[assembly: OwinStartup(typeof(Startup))]
namespace JI.Api
{
    public partial class Startup
    {
        public void ConfigureContainer(IAppBuilder app)
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new ExecutionContextScopeLifestyle();

            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);

            using (container.BeginExecutionContextScope())
            {
                var userStore = container.GetInstance<IUserStore<ApplicationUser>>();
                app.CreatePerOwinContext(() => userStore);

                var roleStore = container.GetInstance<IRoleStore<ApplicationRole, string>>();
                app.CreatePerOwinContext(() => roleStore);

                app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
                app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);
            }
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            var oAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/token"),
                Provider = new ApplicationOAuthProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseOAuthBearerTokens(oAuthOptions);
        }

        public void ConfigureMappings(IAppBuilder app)
        {
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(assembly => assembly.GetTypes())
                .Where(type => type.IsClass && typeof(IMapperRegistrationModule).IsAssignableFrom(type));

            foreach (var type in types)
            {
                var instance = (IMapperRegistrationModule)Activator.CreateInstance(type);
                instance?.Register();
            }
        }

        private static void InitializeContainer(Container container)
        {
            container.RegisterPackages(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}