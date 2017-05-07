using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class UserInfoModel
    {
        [JsonProperty(PropertyName = "email")]
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "lastName")]
        [Required]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "firstName")]
        [Required]
        public string FirstName { get; set; }

        [JsonProperty(PropertyName = "patronymic")]
        [Required]
        public string Patronymic { get; set; }
    }
}