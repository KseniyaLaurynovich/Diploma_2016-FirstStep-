using FirstStep_Api.Business.Contracts;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("subjects")]
    public class SubjectController : ApiController
    {
        private ISubjectHelper _subjectRepository;

        public SubjectController(ISubjectHelper subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        [Route("get")]
        public HttpResponseMessage GetSubjectsForUser()
        {
            var subjects =_subjectRepository.GetSubjectsForUser(1);
            return Request.CreateResponse(HttpStatusCode.Accepted, subjects);
        }
    }
}
