using System.Linq;
using System.Web.Http;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Identity.Models;
using JI.Managers.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("users")]
    [Authorize(Roles="Administrator")]
    public class UserApiController : BaseApiController
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
                user.Groups = UserManager.Value.GetGroups(user.Id)
                    .Select(Mapper.Map<Group, GroupModel>).ToList();
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

            var result = UserManager.Value.AdvancedUpdate(
                user, model.Groups.Select(Mapper.Map<GroupModel, Group>).ToArray());

            return !result.Succeeded
                ? GetErrorResult(result) 
                : Ok(model); 
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
    }
}
