using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class StatisticUserModel : UserModel
    {
        [JsonProperty(PropertyName = "mark")]
        public int? Mark { get; set; }
    }
}