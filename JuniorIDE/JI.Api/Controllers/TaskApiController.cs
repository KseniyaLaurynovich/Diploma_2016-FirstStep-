using System.Web.Http;
using JI.Api.Models;

namespace JI.Api.Controllers
{
    [RoutePrefix("tasks")]
    [Authorize]
    public class TaskApiController : ApiController
    {
        [HttpPost]
        [Route("save")]
        public IHttpActionResult Save(TaskModel task)
        {
            return Ok();
        }
    }
}
