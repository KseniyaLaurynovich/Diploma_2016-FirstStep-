using System.Linq;
using System.Web.Http;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("users")]
    [Authorize]
    public class UserApiController : BaseApiController
    {
        [HttpGet]
        [Route("all")]
        public IHttpActionResult Get()
        {
            var users = UserManager.Value
                .Users
                .Select(u => u.Map<ApplicationUser, UserModel>())
                .ToList();

            return Ok(users);
        }

        [HttpPut]
        [Route("edit")]
        public IHttpActionResult Save(UserModel model)
        {
            if (string.IsNullOrEmpty(model.Id))
                model.Id = User.Identity.GetUserId();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserManager.Value.FindById(model.Id);
            user = model.Map(user);

            var result = UserManager.Value.Update(user);

            return !result.Succeeded
                ? GetErrorResult(result) 
                : Ok(model); 
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult Delete(string id)
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
