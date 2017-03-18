using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class TestModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "taskId")]
        public string TaskId { get; set; }

        [JsonProperty(PropertyName = "inputFile")]
        public FileModel InputFile { get; set; }

        [JsonProperty(PropertyName = "outputFile")]
        public FileModel OutputFile { get; set; }
    }
}