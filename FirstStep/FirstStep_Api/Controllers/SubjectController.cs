using BusinesModels;
using BusinesServices.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Business.Response;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstStep_Api.Controllers
{
    [Authorize]
    [RoutePrefix("subjects")]
    public class SubjectController : ApiController
    {
        private ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [Route("get")]
        [HttpGet]
        public HttpResponseMessage GetForUser()
        {
            var currentUserId = RequestContext.Principal.Identity.ToString();
            var subjects = _subjectService.GetByUser(currentUserId);

            return Response.Create(Request, HttpStatusCode.Accepted, subjects);
        }

        [Route("save")]
        [HttpPost]
        public HttpResponseMessage Save(Subject subject)
        {
            subject.UserId = RequestContext.Principal.Identity.ToString(); 
            if (ModelState.IsValid)
            {
                _subjectService.Save(subject);
                return Response.Create(Request, HttpStatusCode.Accepted, subject);
            }

            return Response.Create(
                Request, HttpStatusCode.BadRequest, subject, ControllerHelper.GetErrosFromModelState(ModelState));
        }

        [Route("delete/{subjectId}")]
        [HttpDelete]
        public HttpResponseMessage Delete(string subjectId)
        {
            _subjectService.Delete(subjectId);
            return Response.Create(Request, HttpStatusCode.Accepted);
        }
    }
}
