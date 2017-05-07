using System.Linq;
using System.Web.Http;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;

namespace JI.Api.Controllers
{
    [RoutePrefix("deadlines")]
    [Authorize(Roles = "Teacher")]
    public class DeadlinesController : BaseApiController
    {
        private readonly IDeadlineManager _deadlineManager;

        public DeadlinesController(IDeadlineManager deadlineManager)
        {
            _deadlineManager = deadlineManager;
        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult GetDeadlines([FromUri]string taskId)
        {
            var result = _deadlineManager.FindByTask(taskId);

            return result.Succeeded
                ? Ok(result.Result.Select(i => new DeadlineModel
                {
                    Deadline = i.Value,
                    GroupId = i.Key.Id,
                    GroupName = i.Key.Name
                }))
                : GetErrorResult(result.Errors);
        }

        [HttpPost]
        [Route("set")]
        public IHttpActionResult SetDeadline([FromUri] string taskId, DeadlineModel model)
        {
            var result = _deadlineManager.SaveDeadlineForTask(taskId, model.GroupId, model.Deadline);

            return result.Succeeded
                ? Ok()
                : GetErrorResult(result.Errors);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if(disposing)
                _deadlineManager?.Dispose();
        }
    }
}
