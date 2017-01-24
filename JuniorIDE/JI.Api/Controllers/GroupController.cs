//using System.Net;
//using System.Net.Http;
//using System.Web.Http;
//using BusinesServices.Contracts;
//using BusinesServices.Models;
//using JI.Api.Business.Response;
//using JI.Api.Models;

//namespace JI.Api.Controllers
//{
//    [RoutePrefix("group")]
//    public class GroupController : ApiController
//    {
//        private readonly IGroupService _groupService;

//        public GroupController(IGroupService groupService)
//        {
//            _groupService = groupService;
//        }

//        [Route("get")]
//        [Authorize(Roles = "Teacher, Admin")]
//        [HttpGet]
//        public IHttpActionResult GetAll()
//        {
//            var groups = _groupService.GetAll();

//            return Ok(groups);
//        }

//        [Route("save")]
//        [Authorize(Roles = "Admin")]
//        [HttpPost]
//        public IHttpActionResult Save(Group group)
//        {
//            _groupService.Save(group);
//            return Ok(group);
//        }

//        [Route("delete/{groupId}")]
//        [Authorize(Roles = "Admin")]
//        [HttpDelete]
//        public IHttpActionResult Delete(string groupId)
//        {
//            _groupService.Delete(groupId);
//            return Ok(groupId);
//        }

//        [Route("assign")]
//        [Authorize(Roles = "Teacher, Admin")]
//        [HttpPut]
//        public HttpResponseMessage AssignSubjectToGroup(AssignedGroup model)
//        {
//            _groupService.AssignToGroup(model.GroupId, model.SubjectId);
//            return Response.Create(Request, HttpStatusCode.Accepted, model.GroupId);
//        }

//        [Route("unassign")]
//        [Authorize(Roles = "Teacher, Admin")]
//        [HttpPut]
//        public HttpResponseMessage RemoveGropuFromSubject(AssignedGroup model)
//        {
//            _groupService.UnassignFromGroup(model.GroupId, model.SubjectId);
//            return Response.Create(Request, HttpStatusCode.Accepted, model.GroupId);
//        }
//    }
//}
