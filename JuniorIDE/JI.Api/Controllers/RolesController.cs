//using System;
//using System.Linq;
//using System.Web.Http;
//using JI.Api.Controllers.Base;
//using JI.Api.Models;
//using JI.Api.ViewModels;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;

//namespace JI.Api.Controllers
//{
//    [RoutePrefix("Roles")]
//    [Authorize(Roles = "Admin")]
//    public class RolesController : BaseIdentityController
//    {
//        [HttpGet]
//        [Route("{id:guid}")]
//        public IHttpActionResult GetRole(string Id)
//        {
//            var role = RoleManager.FindById(Id);

//            if (role != null)
//            {
//                return Ok(role);
//            }

//            return NotFound();

//        }

//        [HttpGet]
//        [Route("getall")]
//        public IHttpActionResult GetAllRoles()
//        {
//            var roles = RoleManager.Roles.Select(r => new RoleViewModel
//            {
//                Id = r.Id,
//                Name = r.Name
//            }).ToList();
//            return Ok(roles);
//        }

//        [HttpPost]
//        [Route("create")]
//        public IHttpActionResult Create(CreateRoleModel model)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            var role = new IdentityRole { Name = model.Name };

//            var result = RoleManager.Create(role);

//            if (!result.Succeeded)
//            {
//                return GetErrorResult(result);
//            }

//            Uri locationHeader = new Uri(Url.Link("GetRoleById", new { id = role.Id }));

//            return Created(locationHeader, role);

//        }

//        [HttpDelete]
//        [Route("delete/{id:guid}")]
//        public IHttpActionResult DeleteRole(string Id)
//        {
//            var role = RoleManager.FindById(Id);

//            if (role != null)
//            {
//                IdentityResult result = RoleManager.Delete(role);

//                if (!result.Succeeded)
//                {
//                    return GetErrorResult(result);
//                }

//                return Ok();
//            }

//            return NotFound();

//        }

//        [Route("assign/{userId}/{role}")]
//        [HttpPut]
//        public IHttpActionResult AssignSubjectToGroup(string userId, string role)
//        {
//            UserManager.AddToRole(userId, role);
//            var roleViewMOdel = RoleManager.Roles.Where(r => r.Name.Equals(role)).Select(r => new RoleViewModel
//            {
//                Id = r.Id,
//                Name = r.Name
//            }).FirstOrDefault();

//            return Ok(roleViewMOdel);
//        }

//        [Route("unassign/{userId}/{role}")]
//        [HttpPut]
//        public IHttpActionResult RemoveGropuFromSubject(string userId, string role)
//        {
//            UserManager.RemoveFromRole(userId, role);
//            var roleViewModel = RoleManager.Roles.Where(r => r.Name.Equals(role)).Select(r => new RoleViewModel
//            {
//                Id = r.Id,
//                Name = r.Name
//            }).FirstOrDefault();

//            return Ok(roleViewModel);
//        }
//    }
//}