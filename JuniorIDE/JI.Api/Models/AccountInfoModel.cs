using System;
using System.Collections.Generic;
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

        [JsonProperty(PropertyName = "registrationDate")]
        public DateTime RegistrationDate { get; set; }

        [JsonProperty(PropertyName = "isActivated")]
        public bool IsActivated { get; set; }

        [JsonProperty(PropertyName = "roles")]
        public IList<string> Roles { get; set; }
    }
}