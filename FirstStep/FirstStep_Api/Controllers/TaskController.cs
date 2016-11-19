using BusinesModels;
using BusinesServices.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Business.Response;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("tasks")]
    public class TaskController : ApiController
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Route("save")]
        [HttpPost]
        public HttpResponseMessage Save(Task task)
        {
            if (ModelState.IsValid)
            {
                _taskService.Save(task);
                return Response.Create(Request, HttpStatusCode.Accepted, task);
            }

            return Response.Create(
                Request, HttpStatusCode.BadRequest, task, ControllerHelper.GetErrosFromModelState(ModelState));
        }
    }
}
