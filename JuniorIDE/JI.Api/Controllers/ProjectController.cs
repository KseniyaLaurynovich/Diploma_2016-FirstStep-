using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using JI.Api.Controllers.Base;
using JI.Managers.Contracts;
using Microsoft.AspNet.Identity;
using System.IO.Compression;
using JI.Api.Business.Helpers;

namespace JI.Api.Controllers
{
    [RoutePrefix("project")]
    [Authorize]
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
    }
}
