using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class TryingModel
    {
        [JsonProperty(PropertyName = "pass")]
        public bool Pass { get; set; }

        [JsonProperty(PropertyName = "errors")]
        public string Errors { get; set; }
    }
}