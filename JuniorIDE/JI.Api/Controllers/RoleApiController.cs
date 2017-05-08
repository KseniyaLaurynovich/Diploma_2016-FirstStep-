using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Identity.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("roles")]
    [Authorize(Roles = "Administrator")]
    public class RoleApiController : BaseApiController
    {
        private readonly IGroupManager _groupManager;

        public RoleApiController(IGroupManager groupManager)
        {
            _groupManager = groupManager;
        }

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
        [Route("get")]
        [AllowAnonymous]
        public IHttpActionResult GetForSignUp()
        {
            var roles = RoleManager.Value.Roles
                .Select(r => r.Map<ApplicationRole, RoleModel>())
                .ToList()
                .Where(r => !r.Name.Equals("Administrator"));

            var groups = _groupManager.GetAll().ToList();
            var result = roles
                .Select(r => new { name = r.Name, groups = r.Name == "Student" ? groups : new List<Group>()})
                .ToList();

            return Ok(result);
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

        protected override void Dispose(bool disposing)
        {
            if(!disposing)
                _groupManager?.Dispose();

            base.Dispose(disposing);
        }
    }
}