using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.UserIdentity.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("account")]
    [Authorize]
    public class AccountController : BaseController
    {
        [HttpPost]
        [Route("changepassword")]
        public IHttpActionResult ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = UserManager.ChangePassword(
                User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public IHttpActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = Mapper.Map<RegisterModel, ApplicationUser>(model);
            var result = UserManager.Create(user, model.Password);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        //[Authorize(Roles = "Admin")]
        //[Route("users")]
        //public IHttpActionResult GetUsers()
        //{
        //    var s = UserManager.Users.ToList();
        //    var users = new List<UserViewModel>();

        //    foreach (var user in s)
        //    {
        //        users.Add(user.Map<ApplicationUser, UserViewModel>());
        //    }
        //    return Ok(users);
        //}

        //[Authorize(Roles = "Admin")]
        //[Route("edit")]
        //[HttpPut]
        //public IHttpActionResult EditUser(UserViewModel model)
        //{
        //    var user = UserManager.FindById(model.Id);
        //    user.Email = model.Email;

        //    var result = UserManager.Update(user);

        //    if (!result.Succeeded)
        //    {
        //        return GetErrorResult(result);
        //    }

        //    var nameClaim = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Name));
        //    if (nameClaim != null)
        //    {
        //        UserManager.RemoveClaim(user.Id, ClaimsProvider.CreateClaim(nameClaim.ClaimType, nameClaim.ClaimValue));
        //    }
        //    UserManager.AddClaim(user.Id, ClaimsProvider.CreateClaim(ClaimTypes.Name, model.FirstName));

        //    var lastNameClaim = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Surname));
        //    if (lastNameClaim != null)
        //    {
        //        UserManager.RemoveClaim(user.Id, ClaimsProvider.CreateClaim(lastNameClaim.ClaimType, lastNameClaim.ClaimValue));
        //    }
        //    UserManager.AddClaim(user.Id, ClaimsProvider.CreateClaim(ClaimTypes.Surname, model.LastName));

        //    return Ok();
        //}

        //[Authorize(Roles = "Admin")]
        //[Route("user/{id:guid}")]
        //[HttpGet]
        //public IHttpActionResult GetUser(string Id)
        //{
        //    var user = UserManager.FindById(Id);

        //    if (user != null)
        //    {
        //        return Ok(user);
        //    }

        //    return NotFound();

        //}

        //[Authorize(Roles = "Admin")]
        //[Route("delete/{id}")]
        //[HttpDelete]
        //public IHttpActionResult DeleteUser(string id)
        //{
        //    var appUser = UserManager.FindById(id);

        //    if (appUser != null)
        //    {
        //        IdentityResult result = UserManager.Delete(appUser);

        //        if (!result.Succeeded)
        //        {
        //            return GetErrorResult(result);
        //        }

        //        return Ok();

        //    }

        //    return NotFound();
        //}

        //[Authorize(Roles = "Admin")]
        //[HttpGet]
        //[Route("userDetails/{userId}")]
        //public HttpResponseMessage GetUserDetails(string userId)
        //{
        //    var user = UserManager.FindById(userId);

        //    if (user == null)
        //    {
        //        return Response.Create(
        //            Request, HttpStatusCode.BadRequest, userId);
        //    }

        //    var model = new UserDetailsViewModel
        //    {
        //        Id = user.Id,
        //        Email = user.Email,
        //        FirstName = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Name))?.ClaimValue,
        //        LastName = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Surname))?.ClaimValue,
        //        Roles = user.Roles
        //            .Select(i => RoleManager.Roles.FirstOrDefault(r => r.Id.Equals(i.RoleId)))
        //            .Where(i => i != null)
        //            .Select(r => new RoleViewModel
        //            {
        //                Id = r.Id,
        //                Name = r.Name
        //            })
        //            .ToArray(),
        //        Subjects = _subjectService.GetByUser(userId).ToArray()

        //    };

        //    return Response.Create(
        //        Request, HttpStatusCode.OK, model);

        //}

        //[Authorize(Roles = "Admin")]
        //[Route("user/{id}/roles")]
        //[HttpPut]
        //public IHttpActionResult AssignRolesToUser([FromUri] string id, [FromBody] string[] rolesToAssign)
        //{
        //    var appUser = UserManager.FindById(id);

        //    if (appUser == null)
        //    {
        //        return NotFound();
        //    }

        //    var currentRoles = UserManager.GetRoles(appUser.Id);

        //    var rolesNotExists = rolesToAssign.Except(RoleManager.Roles.Select(x => x.Name)).ToArray();

        //    if (rolesNotExists.Count() > 0)
        //    {

        //        ModelState.AddModelError("", string.Format("Roles '{0}' does not exixts in the system", string.Join(",", rolesNotExists)));
        //        return BadRequest(ModelState);
        //    }

        //    IdentityResult removeResult = UserManager.RemoveFromRoles(appUser.Id, currentRoles.ToArray());

        //    if (!removeResult.Succeeded)
        //    {
        //        ModelState.AddModelError("", "Failed to remove user roles");
        //        return BadRequest(ModelState);
        //    }

        //    IdentityResult addResult = UserManager.AddToRoles(appUser.Id, rolesToAssign);

        //    if (!addResult.Succeeded)
        //    {
        //        ModelState.AddModelError("", "Failed to add user roles");
        //        return BadRequest(ModelState);
        //    }

        //    return Ok();

        //}

        //[Authorize(Roles = "Admin")]
        //[Route("user/{id:guid}/assignclaims")]
        //[HttpPut]
        //public IHttpActionResult AssignClaimsToUser([FromUri] string id, [FromBody] List<Claim> claimsToAssign)
        //{

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var appUser = UserManager.FindById(id);

        //    if (appUser == null)
        //    {
        //        return NotFound();
        //    }

        //    foreach (Claim claimModel in claimsToAssign)
        //    {
        //        if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
        //        {

        //            UserManager.RemoveClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
        //        }

        //        UserManager.AddClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
        //    }

        //    return Ok();
        //}

        //[Authorize(Roles = "Admin")]
        //[Route("user/{id:guid}/removeclaims")]
        //[HttpPut]
        //public IHttpActionResult RemoveClaimsFromUser([FromUri] string id, [FromBody] List<Claim> claimsToRemove)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var appUser = UserManager.FindById(id);

        //    if (appUser == null)
        //    {
        //        return NotFound();
        //    }

        //    foreach (Claim claimModel in claimsToRemove)
        //    {
        //        if (appUser.Claims.Any(c => c.ClaimType == claimModel.Type))
        //        {
        //            UserManager.RemoveClaim(id, ClaimsProvider.CreateClaim(claimModel.Type, claimModel.Value));
        //        }
        //    }

        //    return Ok();
        //}
    }
}