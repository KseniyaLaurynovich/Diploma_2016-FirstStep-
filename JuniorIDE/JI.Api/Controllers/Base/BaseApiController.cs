﻿using System;
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
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}