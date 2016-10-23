using FirstStep_Api.Business.Contracts;
using FirstStep_Api.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("subjects")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SubjectController : ApiController
    {
        private ISubjectHelper _subjectHelper;
        private ITaskHelper _taskHelper;

        public SubjectController(ISubjectHelper subjectHelper, ITaskHelper taskHelper)
        {
            _subjectHelper = subjectHelper;
            _taskHelper = taskHelper;
        }

        [Route("get/{userId}")]
        [HttpGet]
        public HttpResponseMessage GetSubjectsForUser(int userId)
        {
            var subjects = _subjectHelper
                .GetSubjectsForUser(userId);

            foreach(var subject in subjects)
            {
                subject.Tasks = _taskHelper.GetBySubjectId(subject.Id);
            }

            return Request.CreateResponse(HttpStatusCode.Accepted, JsonConvert.SerializeObject(subjects));
        }

        [Route("save")]
        [HttpPost]
        public HttpResponseMessage SaveSubject(Subject subject)
        {
            if(ModelState.IsValid)
            {
                subject.Id = _subjectHelper.Save(subject);
                return Request.CreateResponse(HttpStatusCode.Accepted, JsonConvert.SerializeObject(subject));
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        public HttpResponseMessage DeleteSubject(int subjectId)
        {

        }
    }
}
