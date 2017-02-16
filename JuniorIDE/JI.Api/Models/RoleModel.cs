using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class RoleModel
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}