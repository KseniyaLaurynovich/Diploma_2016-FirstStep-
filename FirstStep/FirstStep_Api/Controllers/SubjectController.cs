using BusinesModels;
using BusinesServices.Contracts;
using FirstStep_Api.Business.Helpers;
using FirstStep_Api.Business.Response;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("subjects")]
    public class SubjectController : ApiController
    {
        private ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [Route("get/{userId}")]
        [HttpGet]
        public HttpResponseMessage GetForUser(string userId)
        {
            var subjects = _subjectService.GetByUser(userId);

            return Response.Create(Request, HttpStatusCode.Accepted, subjects);
        }

        [Route("save")]
        [HttpPost]
        public HttpResponseMessage Save(Subject subject)
        {
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
