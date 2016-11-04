using Newtonsoft.Json;
using System.Net;
using System.Net.Http;

namespace FirstStep_Api.Business.Response
{
    public class Response
    {
        public static HttpResponseMessage Create<T>(HttpRequestMessage request, HttpStatusCode statusCode, T data, string[] errors = null)
        {
            var model = new { Data = JsonConvert.SerializeObject(data), Errors = errors };
            return request.CreateResponse(statusCode, model);
        }

        public static HttpResponseMessage Create(HttpRequestMessage request, HttpStatusCode statusCode)
        {
            return request.CreateResponse(statusCode);
        }
    }
}