using System.Web.Http;
using JI.Api.Controllers.Base;
using JI.Managers.Contracts;

namespace JI.Api.Controllers
{
    [RoutePrefix("project")]
    //TODO authorize user through plugin
    [AllowAnonymous]
    public class ProjectController : BaseApiController
    {
        private readonly IProjectManager _projectManager;

        public ProjectController(IProjectManager projectManager)
        {
            _projectManager = projectManager;
        }

        [Route("upload")]
        public IHttpActionResult UploadProject()
        {
            //TODO add url params
            var userId = "70cb531d-130b-408a-83c5-d72fe712cc46";
            var taskId = "b61fbd43-395c-478a-addb-f0243ff20a41";

            var projectStream = Request.Content.ReadAsStreamAsync().Result;
            var result = _projectManager.CreateProjectByStream(projectStream, userId, taskId);

            return result.Succeeded 
                ? Ok()
                : GetErrorResult(result.Errors);
        }
    }
}
