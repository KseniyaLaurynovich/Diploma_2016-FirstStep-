using System;
using System.IO;
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

        public TaskApiController(
            ITaskManager taskManager)
        {
            _taskManager = taskManager;
        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult Get()
        {
            var currentUserId = User.Identity.GetUserId();
            var groups = UserManager.Value.GetGroups(currentUserId);

            //TODO mode to resources
            if(!groups.Any())
                return BadRequest("You are not assigned to any group. Contact with our administrator.");

            return Ok(_taskManager
                .GetByGroups(groups)
                .Select(Mapper.Map<Task, TaskPluginModel>)
                .ToList());
        }

        [HttpPost]
        [Route("saveTest/{taskId}")]
        public IHttpActionResult SaveTestFile(string taskId)
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
                var serviceResult = _taskManager.AssociateTestFile(taskId, new File
                {
                    Name = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}",
                    Data = file.InputStream.toBytesArray()
                });
                return serviceResult.Succeeded
                    ? Ok(serviceResult.Result.Id)
                    : GetErrorResult(serviceResult.Errors);
            }

            return BadRequest();
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
