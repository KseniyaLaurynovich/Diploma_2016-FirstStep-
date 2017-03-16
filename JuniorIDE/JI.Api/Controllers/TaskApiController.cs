using System.Web.Http;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;

namespace JI.Api.Controllers
{
    [RoutePrefix("tasks")]
    [Authorize]
    public class TaskApiController : BaseApiController
    {
        private readonly ITaskManager _taskManager;

        public TaskApiController(ITaskManager taskManager)
        {
            _taskManager = taskManager;
        }

        [HttpPost]
        [Route("save")]
        public IHttpActionResult Save(TaskModel task)
        {
            var result = _taskManager.Save(task.Map<TaskModel, Task>());
            return !result.Succeeded
               ? GetErrorResult(result.Errors)
               : Ok(Mapper.Map<Task, TaskModel>(result.Result));
        }

        protected override void Dispose(bool disposing)
        {
            if (!disposing)
            {
                _taskManager?.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
