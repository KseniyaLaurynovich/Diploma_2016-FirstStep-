using System.Linq;
using BusinesServices.Models;
using BusinesServices.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Business.Response;
using Microsoft.AspNet.Identity;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ExpressMapper.Extensions;
using FirstStep_Api.ViewModels;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("subjects")]
    public class SubjectController : BaseIdentityController
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [Route("get")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public HttpResponseMessage GetForUser()
        {
            var currentUserId = User.Identity.GetUserId();
            var subjects = _subjectService.GetByUser(currentUserId);

            return Response.Create(Request, HttpStatusCode.Accepted, subjects);
        }

        [Route("getall")]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            var subjects = _subjectService
                .GetAll()
                .Select(s => s.Map<Subject, SubjectViewModel>())
                .ToList();
            return Response.Create(Request, HttpStatusCode.Accepted, subjects);
        }

        [Route("save")]
        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public HttpResponseMessage Save(Subject subject)
        {
            subject.UserId = User.Identity.GetUserId(); 
            if (ModelState.IsValid)
            {
                _subjectService.Save(subject);
                return Response.Create(Request, HttpStatusCode.Accepted, subject);
            }

            return Response.Create(
                Request, HttpStatusCode.BadRequest, subject, ControllerHelper.GetErrosFromModelState(ModelState));
        }

        [Route("save/{userId}")]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public HttpResponseMessage Save(Subject subject, [FromUri]string userId)
        {
            subject.UserId = userId;
            if (ModelState.IsValid)
            {
                _subjectService.Save(subject);
                return Response.Create(Request, HttpStatusCode.Accepted, subject.Map<Subject, SubjectViewModel>());
            }

            return Response.Create(
                Request, HttpStatusCode.BadRequest, subject.Map<Subject, SubjectViewModel>(), ControllerHelper.GetErrosFromModelState(ModelState));
        }

        [Route("delete/{subjectId}")]
        [Authorize(Roles = "Teacher,Admin")]
        [HttpDelete]
        public HttpResponseMessage Delete(string subjectId)
        {
            _subjectService.Delete(subjectId);
            return Response.Create(Request, HttpStatusCode.Accepted);
        }
    }
}
