﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class AccountInfoModel
    {
        public AccountInfoModel()
        {
            Roles = new List<string>();
        }

        [JsonProperty(PropertyName = "userName")]
        public string UserName { get; set; }

        [JsonProperty(PropertyName = "email")]
        [EmailAddress]
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

        [JsonProperty(PropertyName = "groups")]
        public IList<GroupModel> Groups { get; set; }
    }
}