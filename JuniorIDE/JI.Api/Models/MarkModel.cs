using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class MarkModel
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "taskId")]
        public string TaskId { get; set; }

        [JsonProperty(PropertyName = "mark")]
        public int? Mark { get; set; }
    }
}