using BusinesServices.Contracts;
using FirstStep_Api.Business.Response;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("group")]
    public class GroupController : ApiController
    {
        private IGroupService _groupService;

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
    }
}
