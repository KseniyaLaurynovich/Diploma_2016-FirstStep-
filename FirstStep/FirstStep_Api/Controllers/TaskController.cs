using System;
using System.Linq;
using BusinesServices.Models;
using BusinesServices.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Business.Response;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ExpressMapper.Extensions;
using FirstStep_Api.ViewModels;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("tasks")]
    public class TaskController : ApiController
    {
        private readonly ITaskService _taskService;
        private readonly ISubjectService _subjectService;

        public TaskController(ITaskService taskService, ISubjectService subjectService)
        {
            _taskService = taskService;
            _subjectService = subjectService;
        }

        [Authorize(Roles = "Teacher, Admin")]
        [Route("save")]
        [HttpPost]
        public HttpResponseMessage Save(Task task)
        {
            if (ModelState.IsValid)
            {
                task.LastModified = DateTime.Now;
                _taskService.Save(task);
                return Response.Create(Request, HttpStatusCode.Accepted, new TaskViewModel
                {
                    Id = task.Id,
                    Name = task.Name,
                    Description = task.Description,
                    Subject = _subjectService.GetById(task.SubjectId).Map<Subject, SubjectViewModel>()
                });
            }

            return Response.Create(
                Request, HttpStatusCode.BadRequest, task, ControllerHelper.GetErrosFromModelState(ModelState));
        }

        [Route("getall")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public HttpResponseMessage GetAll()
        {
            var tasks = _taskService
                .GetAll()
                .Select(s => new TaskViewModel
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Subject = _subjectService.GetById(s.SubjectId).Map<Subject, SubjectViewModel>()
                });

            return Response.Create(Request, HttpStatusCode.Accepted, tasks);
        }

        [Route("get/{id}")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public HttpResponseMessage GetById(string id)
        {
            var task = _taskService.GetById(id);
            return Response.Create(Request, HttpStatusCode.Accepted, task);
        }

        [Route("delete/{taskId}")]
        [Authorize(Roles = "Teacher,Admin")]
        [HttpDelete]
        public HttpResponseMessage Delete(string taskId)
        {
            _taskService.Delete(taskId);
            return Response.Create(Request, HttpStatusCode.Accepted);
        }
    }
}
