using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using JI.Api.Controllers.Base;

namespace JI.Api.Controllers
{
    [RoutePrefix("project")]
    [AllowAnonymous]
    public class ProjectController : BaseApiController
    {
        [Route("upload")]
        public IHttpActionResult UploadProject()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var file = HttpContext.Current.Request.Files.Count > 0
                ? HttpContext.Current.Request.Files[0]
                : null;

            return Ok();
        }
    }
}
