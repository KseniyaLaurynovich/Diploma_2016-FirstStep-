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
        private readonly IAutoTestedManager _testManager;

        public ProjectController(
            IProjectManager projectManager, IAutoTestedManager testManager)
        {
            _projectManager = projectManager;
            _testManager = testManager;
        }

        [HttpPost]
        [Route("upload")]
        public IHttpActionResult UploadProject()
        {
            //TODO add url params
            var userId = "70cb531d-130b-408a-83c5-d72fe712cc46";
            var taskId = "b61fbd43-395c-478a-addb-f0243ff20a41";

            var projectStream = System.IO.File.OpenRead("D:/1.zip");//Request.Content.ReadAsStreamAsync().Result;
            var result = _projectManager.CreateProjectByStream(projectStream, userId, taskId);

            if (result.Succeeded)
            {
                var testResult = _testManager.Test(userId, taskId);

                return testResult.Succeeded
                ? Ok(testResult.Result)
                : GetErrorResult(testResult.Errors);
            }

            return GetErrorResult(result.Errors);
        }
    }
}
