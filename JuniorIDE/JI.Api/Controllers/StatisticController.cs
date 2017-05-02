using System.Linq;
using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
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
        [Route("getByTask")]
        public IHttpActionResult GetByTaskId(string taskId)
        {
            var userId = User.Identity.GetUserId();

            var result = _statisticManager.Get(userId, taskId);

            return result.Succeeded
                ? Ok(result.Result.Select(Mapper.Map<TryingHistory, TryingHistoryModel>))
                : GetErrorResult(result.Errors);
        }
    }
}
