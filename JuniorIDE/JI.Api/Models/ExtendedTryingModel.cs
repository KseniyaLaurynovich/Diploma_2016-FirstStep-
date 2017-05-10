using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class ExtendedTryingModel : TryingModel
    {
        [JsonProperty(PropertyName = "inputFileId")]
        public string InputFileId { get; set; }

        [JsonProperty(PropertyName = "inputFileName")]
        public string InputFileName { get; set; }

        [JsonProperty(PropertyName = "outputFileId")]
        public string OutputFileId { get; set; }

        [JsonProperty(PropertyName = "outputFileName")]
        public string OutputFileName { get; set; }
    }
}