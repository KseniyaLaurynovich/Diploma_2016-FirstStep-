//using System.Web;
//using System.Web.Http;
//using BusinesServices.Contracts;
//using BusinesServices.Models;

//namespace JI.Api.Controllers
//{
//    [RoutePrefix("tests")]
//    public class TestsController : ApiController
//    {
//        private readonly ITestService _testService;

//        public TestsController(ITestService testService)
//        {
//            _testService = testService;
//        }

//        [HttpPost]
//        [AllowAnonymous]
//        [Route("save/{taskId}")]
//        public IHttpActionResult Save([FromUri]string taskId, Test test)
//        {
//            var files = HttpContext.Current.Request.Files;
//            //_testService.Save(test);
//            return Ok(test);
//        }
//    }
//}
