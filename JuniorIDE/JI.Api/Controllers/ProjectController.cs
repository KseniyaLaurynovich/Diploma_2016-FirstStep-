//using System.Net.Http;
//using System.Web;
//using System.Web.Http;
//using BusinesServices.Contracts;
//using JI.Api.Business.Response;

//namespace JI.Api.Controllers
//{
//    [RoutePrefix("project")]
//    [Authorize(Roles = "Student")]
//    public class ProjectController : ApiController
//    {
//        private readonly IFileService _fileService;

//        public ProjectController(IFileService fileService)
//        {
//            _fileService = fileService;
//        }

//        [Route("upload/{userId}")]
//        [HttpPost]
//        public HttpResponseMessage UploadProject([FromUri]string userId)
//        {
//            var file = HttpContext.Current.Request.Files.Count > 0 ?
//            HttpContext.Current.Request.Files[0] : null;

//            string[] errors;
//            if (file != null)
//            {
//                _fileService.LoadProjectForUser(userId, file.InputStream, file.FileName, out errors);
//            }

//            return Response.Create(Request, System.Net.HttpStatusCode.Created);
//        }
//    }
//}