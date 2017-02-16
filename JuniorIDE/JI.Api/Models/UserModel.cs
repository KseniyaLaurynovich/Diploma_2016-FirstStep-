using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class UserModel
    {
        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [Required]
        [JsonProperty(PropertyName = "userName")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [Required]
        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }

        [Required]
        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        [Required]
        [JsonProperty(PropertyName = "patronymic")]
        public string Patronymic { get; set; }

        [JsonProperty(PropertyName = "roles")]
        public IList<string> Roles { get; set; }

        [JsonProperty(PropertyName = "groups")]
        public IList<GroupModel> Groups { get; set; }
    }
}