using System.Linq;
using System.Web.Http;
using JI.Api.Controllers.Base;
using JI.UserIdentity.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("roles")]
    [Authorize(Roles = "Admin")]
    public class RolesController : BaseController
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

        [HttpPost]
        [Route("create")]
        public IHttpActionResult Create(ApplicationRole model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = RoleManager.Value.Create(model);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpDelete]
        [Route("delete/{id:guid}")]
        public IHttpActionResult DeleteRole(string id)
        {
            var role = RoleManager.Value.FindById(id);

            if (role != null)
            {
                var result = RoleManager.Value.Delete(role);

                return !result.Succeeded 
                    ? GetErrorResult(result) 
                    : Ok();
            }

            return NotFound();
        }
    }
}