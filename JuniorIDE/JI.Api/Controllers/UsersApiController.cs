using System.Linq;
using System.Web.Http;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Api.ViewModels;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("users")]
    [Authorize(Roles="Administrator")]
    public class UsersApiController : BaseApiController
    {
        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetUsers()
        {
            var users = UserManager.Value
                .Users
                .Select(u => u.Map<ApplicationUser, UserModel>())
                .ToList();

            foreach (var user in users)
            {
                var roles = UserManager.Value
                .GetRoles(user.Id);

                user.Roles = roles;
            }

            return Ok(users);
        }

        [HttpPut]
        [Route("edit")]
        public IHttpActionResult EditUser(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserManager.Value.FindById(model.Id);
            user = model.Map(user);

            var roles = UserManager.Value.GetRoles(user.Id);
            var addedRoles = model.Roles.Where(r => !roles.Contains(r)).ToArray();
            var removedRoles = roles.Where(r => !model.Roles.Contains(r)).ToArray();

            var result = UserManager.Value.UpdateWithRoles(user, addedRoles, removedRoles);

            return !result.Succeeded
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var user = UserManager.Value.FindById(id);

            if (user == null) return NotFound();
            var result = UserManager.Value.Delete(user);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpPut]
        [Route("addtorole/{id}")]
        public IHttpActionResult AddUserToRole([FromUri] string id, [FromBody] string roleName)
        {
            var result = UserManager.Value.AddToRole(id, roleName);

            return !result.Succeeded
                ? GetErrorResult(result)
                : Ok();
        }

        [HttpPut]
        [Route("removefromrole/{id}")]
        public IHttpActionResult RemoveUserFromRole([FromUri] string id, [FromBody] string roleName)
        {
            var result = UserManager.Value.RemoveFromRole(id, roleName);

            return !result.Succeeded
                ? GetErrorResult(result)
                : Ok();
        }
    }
}
