using System.Linq;
using System.Web.Http;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using JI.Managers.Contracts;
using JI.Managers.Models;
using Microsoft.AspNet.Identity;

namespace JI.Api.Controllers
{
    [RoutePrefix("subjects")]
    public class SubjectApiController : BaseApiController
    {
        private readonly ISubjectManager _subjectManager;

        public SubjectApiController(ISubjectManager subjectManager)
        {
            _subjectManager = subjectManager;
        }

        [Route("getById/{subjectId}")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public IHttpActionResult GetById(string subjectId)
        {
            var subject = _subjectManager.FindById(subjectId).Map<Subject, SubjectModel>();
            return Ok(subject);
        }

        [Route("getByUser")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public IHttpActionResult GetSubjectsByUser()
        {
            var currentUserId = User.Identity.GetUserId();
            var subjects = _subjectManager.FindByUserId(currentUserId);

            return Ok(subjects.Select(Mapper.Map<Subject, SubjectModel>));
        }

        [Route("save")]
        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public IHttpActionResult SaveSubject(SubjectModel subject)
        {
            var currentUserId = User.Identity.GetUserId();
            subject.UserId = currentUserId;

            var result = _subjectManager.Save(Mapper.Map<SubjectModel, Subject>(subject));

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok(Mapper.Map<Subject, SubjectModel>(result.Result));
        }

        [Route("delete/{subjectId}")]
        [Authorize(Roles = "Teacher")]
        [HttpDelete]
        public IHttpActionResult DeleteSubject(string subjectId)
        {
            var result = _subjectManager.Delete(subjectId);

            return !result.Succeeded
                ? GetErrorResult(result.Errors)
                : Ok();
        }

        protected new void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (!disposing)
            {
                _subjectManager?.Dispose();
            }
        }
    }
}