using BusinesServices.Contracts;
using FirstStep_Api.Business.Response;
using FirstStep_Api.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("group")]
    public class GroupController : ApiController
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [Route("get")]
        [Authorize(Roles = "Teacher")]
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            var groups = _groupService.GetAll();

            return Response.Create(Request, HttpStatusCode.Accepted, groups);
        }

        [Route("assign")]
        [Authorize(Roles = "Teacher")]
        [HttpPut]
        public HttpResponseMessage AssignSubjectToGroup(AssignedGroup model)
        {
            _groupService.AssignToGroup(model.GroupId, model.SubjectId);
            return Response.Create(Request, HttpStatusCode.Accepted, model.GroupId);
        }

        [Route("unassign")]
        [Authorize(Roles = "Teacher")]
        [HttpPut]
        public HttpResponseMessage RemoveGropuFromSubject(AssignedGroup model)
        {
            _groupService.UnassignFromGroup(model.GroupId, model.SubjectId);
            return Response.Create(Request, HttpStatusCode.Accepted, model.GroupId);
        }
    }
}
