using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using JI.UserIdentity.Managers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace JI.Api.Controllers.Base
{
    public class BaseApiController : ApiController
    {
        protected readonly Lazy<ApplicationUserManager> UserManager = 
            new Lazy<ApplicationUserManager>(() => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>());

        protected readonly Lazy<ApplicationRoleManager> RoleManager =
            new Lazy<ApplicationRoleManager>(() => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationRoleManager>());

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected IHttpActionResult GetErrorResult(IEnumerable<string> errors)
        {
            if (errors != null)
            {
                foreach (var error in errors)
                {
                    ModelState.AddModelError("", error);
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (!disposing)
            {
                if (UserManager.IsValueCreated)
                {
                    UserManager.Value.Dispose();
                }

                if (RoleManager.IsValueCreated)
                {
                    RoleManager.Value.Dispose();
                }
            }
        }
    }
}