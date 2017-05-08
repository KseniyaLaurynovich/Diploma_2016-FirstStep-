﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class UserModel : AccountInfoModel
    {
        public UserModel()
        {
            Groups = new List<GroupModel>();
        }

        [Required]
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "groups")]
        public IList<GroupModel> Groups { get; set; }
    }
}