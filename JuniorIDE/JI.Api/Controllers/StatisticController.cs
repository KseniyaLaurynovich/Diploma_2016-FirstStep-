using System.Linq;
using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

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
        public IHttpActionResult GetByTaskId()
        {
            //TODO add url params
            var userId = "70cb531d-130b-408a-83c5-d72fe712cc46";
            var taskId = "b61fbd43-395c-478a-addb-f0243ff20a41";

            var result = _statisticManager.Get(userId, taskId);

            return result.Succeeded
                ? Ok(result.Result.Select(Mapper.Map<TryingHistory, TryingHistoryModel>))
                : GetErrorResult(result.Errors);
        }
    }
}
