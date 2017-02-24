using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class SubjectModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }

        [Required]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}