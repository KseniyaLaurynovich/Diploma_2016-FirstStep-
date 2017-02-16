using System.Linq;
using System.Web.Http;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("roles")]
    [Authorize(Roles = "Administrator")]
    public class RolesApiController : BaseApiController
    {
        [HttpGet]
        [Route("{id:guid}")]
        public IHttpActionResult GetRole(string id)
        {
            var role = RoleManager.Value.FindById(id);

            if (role != null)
            {
                return Ok(role.Map<ApplicationRole, RoleModel>());
            }

            return NotFound();
        }

        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetAllRoles()
        {
            var roles = RoleManager.Value.Roles
                .Select(r => r.Map<ApplicationRole, RoleModel>())
                .ToList();
            return Ok(roles);
        }
    }
}