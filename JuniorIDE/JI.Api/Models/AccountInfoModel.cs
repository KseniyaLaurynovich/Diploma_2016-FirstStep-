using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class AccountInfoModel
    {
        [JsonProperty(PropertyName = "userName")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }

        [JsonProperty(PropertyName = "patronymic")]
        public string Patronymic { get; set; }
    }
}