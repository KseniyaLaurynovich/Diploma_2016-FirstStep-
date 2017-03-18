using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class FileModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}