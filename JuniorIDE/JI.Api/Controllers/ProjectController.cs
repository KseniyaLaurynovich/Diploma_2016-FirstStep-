using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using JI.Api.Business.Helpers;
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
            using(var s = Request.Content.ReadAsStreamAsync().Result)
            {
                using (var fs = File.Create("D:/1.txt"))
                {
                    s.CopyTo(fs);
                }
            }

            return Ok();
        }

        public static Stream GenerateStreamFromString(string s)
        {
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            writer.Write(s);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}
