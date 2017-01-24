using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JI.UserIdentity.Managers;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.AspNet.Identity.Owin;

namespace JI.UserIdentity.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private const string PublicClientId = "self";

        public override async Task GrantResourceOwnerCredentials(
            OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.Get<ApplicationUserManager>();
            //var roleManager = context.OwinContext.GetUserManager<ApplicationRoleManager>();

            var user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            var oAuthIdentity = userManager.CreateIdentity(user, OAuthDefaults.AuthenticationType);
            var cookiesIdentity = userManager.CreateIdentity(user, OAuthDefaults.AuthenticationType);

            //var roles = await userManager.GetRolesAsync(user.Id);

            var properties = CreateProperties(user.UserName);
            var ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(
            OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == PublicClientId)
            {
                var expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        #region Helpers

        private AuthenticationProperties CreateProperties(string userName)
        {
            var data = new Dictionary<string, string>
            {
                { "userName", userName },
                //{ "roles", string.Join(",", roles) }
            };
            return new AuthenticationProperties(data);
        }

        #endregion
    }
}
