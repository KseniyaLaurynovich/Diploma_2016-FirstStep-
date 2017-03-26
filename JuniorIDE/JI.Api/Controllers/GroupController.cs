using System.Linq;
using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Api.Controllers
{
    [RoutePrefix("groups")]
    [Authorize(Roles = "Administrator, Teacher")]
    public class GroupController : BaseApiController
    {
        private readonly IGroupManager _groupManager;

        public GroupController(IGroupManager groupManager)
        {
            _groupManager = groupManager;
        }

        [HttpGet]
        [Route("all")]
        [AllowAnonymous]
        public IHttpActionResult GetGroups()
        {
            var groups = _groupManager
                .GetAll()
                .Select(Mapper.Map<Group, GroupModel>)
                .ToList();

            return Ok(groups);
        }

        [HttpPost]
        [Route("save")]
        public IHttpActionResult Save(GroupModel group)
        {
            var result = _groupManager.Save(Mapper.Map<GroupModel, Group>(group));

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok(Mapper.Map<Group, GroupModel>(result.Result));
        }

        [HttpDelete]
        [Route("delete/{groupId}")]
        public IHttpActionResult Delete(string groupId)
        {
            var result = _groupManager.Delete(groupId);

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok();
        }

        protected new void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (!disposing)
            {
                _groupManager?.Dispose();
            }
        }
    }
}
