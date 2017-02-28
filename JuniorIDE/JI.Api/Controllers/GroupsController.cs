using System.Linq;
using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Services.Contracts;
using JI.Services.Models;

namespace JI.Api.Controllers
{
    [RoutePrefix("groups")]
    [Authorize(Roles = "Administrator")]
    public class GroupsController : BaseApiController
    {
        private readonly IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetGroups()
        {
            var groups = _groupService
                .GetAll()
                .Select(Mapper.Map<Group, GroupModel>)
                .ToList();

            return Ok(groups);
        }

        [HttpPost]
        [Route("save")]
        public IHttpActionResult SaveSubject(GroupModel group)
        {
            var result = _groupService.Save(Mapper.Map<GroupModel, Group>(group));

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok(Mapper.Map<Group, GroupModel>(result.Result));
        }

        [HttpDelete]
        [Route("delete/{groupId}")]
        public IHttpActionResult DeleteSubject(string groupId)
        {
            var result = _groupService.Delete(groupId);

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok();
        }

        protected new void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (!disposing)
            {
                _groupService?.Dispose();
            }
        }
    }
}
