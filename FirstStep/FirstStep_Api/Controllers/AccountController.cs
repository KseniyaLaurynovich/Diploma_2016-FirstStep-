using FirstStep_Api.App_Start;
using FirstStep_Api.Business.Models;
using FirstStep_Api.Business.Providers;
using FirstStep_Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("Account")]
    [Authorize]
    public class AccountController : BaseIdentityController
    {
        private const string LocalLoginProvider = "Local";

        [HttpPost]
        [Route("ChangePassword")]
        public IHttpActionResult ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = UserManager.ChangePassword(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public IHttpActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

            var result = UserManager.Create(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(UserManager.Users.ToList());
        }

        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}")]
        public IHttpActionResult GetUser(string Id)
        {
            var user = UserManager.FindById(Id);

            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();

        }

        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var appUser = UserManager.FindById(id);

            if (appUser != null)
            {
                IdentityResult result = UserManager.Delete(appUser);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok();

            }

            return NotFound();
        }

        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}/roles")]
        [HttpPut]
        public IHttpActionResult AssignRolesToUser([FromUri] string id, [FromBody] string[] rolesToAssign)
        {
            var appUser = UserManager.FindById(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = UserManager.GetRoles(appUser.Id);

            var rolesNotExists = rolesToAssign.Except(RoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Count() > 0)
            {

                ModelState.AddModelError("", string.Format("Roles '{0}' does not exixts in the system", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult = UserManager.RemoveFromRoles(appUser.Id, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = UserManager.AddToRoles(appUser.Id, rolesToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok();

        }

        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}/assignclaims")]
        [HttpPut]
        public IHttpActionResult AssignClaimsToUser([FromUri] string id, [FromBody] List<Claim> claimsToAssign)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = UserManager.FindById(id);

            if (appUser == null)
            {
                return NotFound();
            }

            foreach (Claim claimModel in claimsToAssign)
            {
                if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
                {

                    UserManager.RemoveClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
                }

                UserManager.AddClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}/removeclaims")]
        [HttpPut]
        public IHttpActionResult RemoveClaimsFromUser([FromUri] string id, [FromBody] List<Claim> claimsToRemove)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = UserManager.FindById(id);

            if (appUser == null)
            {
                return NotFound();
            }

            foreach (Claim claimModel in claimsToRemove)
            {
                if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
                {
                    UserManager.RemoveClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
                }
            }

            return Ok();
        }

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        

        #endregion
    }
}