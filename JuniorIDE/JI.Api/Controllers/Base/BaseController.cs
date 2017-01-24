using System.Net.Http;
using System.Web.Http;
using JI.UserIdentity.Managers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace JI.Api.Controllers.Base
{
    public class BaseController : ApiController
    {
        private readonly ApplicationUserManager _userManager;
        
        //private ApplicationRoleManager _roleManager;

        protected ApplicationUserManager UserManager 
            => _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

        //protected ApplicationRoleManager RoleManager
        //{
        //    get
        //    {
        //        return _roleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
        //    }
        //}

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