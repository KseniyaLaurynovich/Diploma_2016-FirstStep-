using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using JI.Api.Controllers.Base;
using JI.Managers.Contracts;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("project")]
    [Authorize]
    public class ProjectController : BaseApiController
    {
        private readonly IProjectManager _projectManager;
        private readonly IAutoTestedManager _testManager;
        private readonly IFileManager _fileManager;

        public ProjectController(
            IProjectManager projectManager, IAutoTestedManager testManager, IFileManager fileManager)
        {
            _projectManager = projectManager;
            _testManager = testManager;
            _fileManager = fileManager;
        }

        [HttpPost]
        [Route("upload")]
        public IHttpActionResult UploadProject([FromUri]string taskId)
        {
            var userId = User.Identity.GetUserId();

            //TODO check if valid & check if auto tested
            var projectStream = Request.Content.ReadAsStreamAsync().Result;
            var result = _projectManager.CreateProjectByStream(projectStream, userId, taskId);

            if (result.Succeeded)
            {
                Task.Run(() =>
                {
                    var testResult = _testManager.Test(userId, taskId);
                });
            }

            return Ok();
        }



        [HttpGet]
        [Route("getProjectStructure")]
        public IHttpActionResult GetProjectStructure(string taskId, string userId)
        {
            var result = _projectManager.GetProjectStructure(userId, taskId);
            return Ok(result);
        }

        [HttpGet]
        [Route("getFile")]
        public IHttpActionResult GetFile(string fileId)
        {
            var data = _fileManager.GetFileData(fileId);
            var stringData = System.Text.Encoding.Default.GetString(data);

            return Ok(stringData);
        }
    }
}
