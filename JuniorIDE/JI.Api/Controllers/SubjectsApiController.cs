using System.Web.Http;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Services.Contracts;
using JI.Services.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("subjects")]
    public class SubjectsApiController : BaseApiController
    {
        private readonly ISubjectService _subjectService;

        public SubjectsApiController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [Route("getByUser")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public IHttpActionResult GetSubjectsByUser()
        {
            var currentUserId = User.Identity.GetUserId();
            var subjects = _subjectService.FindByUserId(currentUserId);

            return Ok(subjects);
        }

        [Route("add")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public IHttpActionResult AddSubject(SubjectModel subject)
        {
            var currentUserId = User.Identity.GetUserId();
            subject.UserId = currentUserId;

            var result = _subjectService.Save(Mapper.Map<SubjectModel, Subject>(subject));

            return !result.Succeeded
                ? GetErrorResult(result)
                : Ok();
        }

        [Route("delete/{subjectId}")]
        [Authorize(Roles = "Teacher,Admin")]
        [HttpDelete]
        public IHttpActionResult DeleteSubject(string subjectId)
        {
            var result = _subjectService.Delete(subjectId);

            return !result.Succeeded
                ? GetErrorResult(result)
                : Ok();
        }

        protected new void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (!disposing)
            {
                _subjectService?.Dispose();
            }
        }
    }
}