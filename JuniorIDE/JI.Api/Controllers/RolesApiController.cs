using System.Linq;
using System.Web.Http;
using JI.Api.Controllers.Base;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("roles")]
    [Authorize(Roles = "Admin")]
    public class RolesApiController : BaseApiController
    {
        [HttpGet]
        [Route("{id:guid}")]
        public IHttpActionResult GetRole(string id)
        {
            var role = RoleManager.Value.FindById(id);

            if (role != null)
            {
                return Ok(role);
            }

            return NotFound();
        }

        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAllRoles()
        {
            var roles = RoleManager.Value.Roles.ToList();
            return Ok(roles);
        }

        [HttpGet]
        [Route("all/{id}")]
        public IHttpActionResult GetRolesForUser(string id)
        {
            var roles = UserManager.Value.GetRoles(id).ToList();
            return Ok(roles);
        }
    }
}