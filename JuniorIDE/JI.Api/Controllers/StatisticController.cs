using System.Linq;
using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Identity.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("statistic")]
    [Authorize]
    public class StatisticController : BaseApiController
    {
        private readonly IStatisticManager _statisticManager;

        public StatisticController(IStatisticManager statisticManager)
        {
            _statisticManager = statisticManager;
        }

        [HttpGet]
        [Route("getGroupsWithUsers")]
        public IHttpActionResult GetGroupsWithUsers([FromUri]string taskId)
        {
            var result = _statisticManager
                .GetGroupsWithUsers(taskId);

            if(!result.Succeeded)
                return GetErrorResult(result.Errors);

            return Ok(result.Result
                .Select(i => new GroupWithUsersModel
                {
                    Id = i.Group.Id,
                    Name = i.Group.Name,
                    Users = i.Users.Select(Mapper.Map<ApplicationUser, UserModel>).ToList()
                }));
        }

        [HttpGet]
        [Route("getByTask")]
        public IHttpActionResult GetByTaskId(string taskId)
        {
            var userId = User.Identity.GetUserId();

            var result = _statisticManager.Get(userId, taskId);

            return result.Succeeded
                ? Ok(result.Result.Select(Mapper.Map<TryingHistory, TryingHistoryModel>))
                : GetErrorResult(result.Errors);
        }

        protected override void Dispose(bool disposing)
        {
            if(!disposing)
                _statisticManager?.Dispose();

            base.Dispose(disposing);
        }
    }
}
