using FirstStep_Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("Account")]
    [Authorize(Roles = "Admin")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RolesController : BaseIdentityController
    {
        [HttpGet]
        [Route("{id:guid}")]
        public IHttpActionResult GetRole(string Id)
        {
            var role = RoleManager.FindById(Id);

            if (role != null)
            {
                return Ok(role);
            }

            return NotFound();

        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllRoles()
        {
            var roles = RoleManager.Roles;
            return Ok(roles);
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult Create(CreateRoleModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = new IdentityRole { Name = model.Name };

            var result = RoleManager.Create(role);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            Uri locationHeader = new Uri(Url.Link("GetRoleById", new { id = role.Id }));

            return Created(locationHeader, role);

        }

        [HttpDelete]
        [Route("delete/{id:guid}")]
        public IHttpActionResult DeleteRole(string Id)
        {
            var role = RoleManager.FindById(Id);

            if (role != null)
            {
                IdentityResult result = RoleManager.Delete(role);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok();
            }

            return NotFound();

        }
    }
}