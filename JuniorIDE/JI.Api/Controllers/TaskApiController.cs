using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.Api.Business.Helpers;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using Microsoft.AspNet.Identity;
using File = JI.Managers.Models.File;

namespace JI.Api.Controllers
{
    [RoutePrefix("tasks")]
    [Authorize]
    public class TaskApiController : BaseApiController
    {
        private readonly ITaskManager _taskManager;
        private readonly IFileManager _fileManager;

        public TaskApiController(
            ITaskManager taskManager, IFileManager fileManager)
        {
            _taskManager = taskManager;
            _fileManager = fileManager;
        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult Get(string taskId)
        {
            var currentUserId = User.Identity.GetUserId();
            var groups = UserManager.Value.GetGroups(currentUserId);

            var result = _taskManager
                .GetTaskForUser(currentUserId, taskId, groups);

            return result.Succeeded
                ? Ok(result.Result.Map<Task, TaskPluginModel>())
                : GetErrorResult(result.Errors);
        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult Get()
        {
            var currentUserId = User.Identity.GetUserId();
            var groups = UserManager.Value.GetGroups(currentUserId);

            //TODO move to resources
            if(!groups.Any())
                return BadRequest("You are not assigned to any group. Contact with our administrator.");

            return Ok(_taskManager
                .GetByGroups(groups)
                .Where(t => t.IsVisible)
                .Select(Mapper.Map<Task, TaskPluginModel>)
                .ToList());
        }

        [HttpPost]
        [Route("saveTest")]
        public IHttpActionResult SaveTestFile([FromUri]string taskId, [FromUri]string filesIds)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var file = HttpContext.Current.Request.Files.Count > 0 
                ? HttpContext.Current.Request.Files[0] 
                : null;

            if (file != null)
            {
                if (filesIds != null)
                    _taskManager.RemoveExtraFiles(taskId, filesIds.Split(','));

                var serviceResult = _taskManager.AssociateTestFile(taskId, new File
                {
                    Name = file.FileName,
                    Data = file.InputStream.toBytesArray()
                });
                return serviceResult.Succeeded
                    ? Ok(serviceResult.Result.Id)
                    : GetErrorResult(serviceResult.Errors);
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("testFile")]
        [AllowAnonymous]
        public HttpResponseMessage GetTestFile([FromUri]string testFileId)
        {
            var file = _fileManager.GetFile(testFileId);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(file.Stream);
            response.Content.Headers.Add("Content-Disposition", $"inline; filename={file.Name}");

            return response;
        }

        [HttpPut]
        [Route("changeVisibility/{taskId}/{isVisible}")]
        public IHttpActionResult ChangeVisibility(string taskId, bool isVisible)
        {
            var result = _taskManager.SetVisibility(taskId, isVisible);
            return !result.Succeeded
               ? GetErrorResult(result.Errors)
               : Ok();
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

        [Route("getById/{taskId}")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public IHttpActionResult GetById(string taskId)
        {
            var task = _taskManager.FindById(taskId).Map<Task, TaskModel>();
            return Ok(task);
        }

        [Route("delete/{taskId}")]
        [Authorize(Roles = "Teacher")]
        [HttpDelete]
        public IHttpActionResult Delete(string taskId)
        {
            var serviceResult = _taskManager.Delete(taskId);
            return serviceResult.Succeeded
                ? Ok()
                : GetErrorResult(serviceResult.Errors);
        }


        [HttpPost]
        [Route("setMark")]
        public IHttpActionResult SetMark(MarkModel markModel)
        {
            var result = _taskManager.SetMark(markModel.UserId, markModel.TaskId, markModel.Mark);
            return result.Succeeded
                ? Ok()
                : GetErrorResult(result.Errors);
        }

        protected override void Dispose(bool disposing)
        {
            if (!disposing)
            {
                _taskManager?.Dispose();
                _fileManager?.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
