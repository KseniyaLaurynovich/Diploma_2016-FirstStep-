using BusinesServices.Contracts;
using FirstStep_Api.Business.Response;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FirstStep_Api.Controllers
{
    [RoutePrefix("project")]
    public class ProjectController : ApiController
    {
        private readonly IFileService _fileService;

        public ProjectController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [Route("upload")]
        [HttpPost]
        public HttpResponseMessage UploadProject(string userId)
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
            HttpContext.Current.Request.Files[0] : null;

            string[] errors;
            _fileService.LoadProjectForUser(userId, file.InputStream, file.FileName, out errors);

            return Response.Create(Request, System.Net.HttpStatusCode.Created);
        }
    }
}