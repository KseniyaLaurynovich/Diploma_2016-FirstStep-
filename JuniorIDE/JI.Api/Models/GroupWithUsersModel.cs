using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class GroupWithUsersModel : GroupModel
    {
        [JsonProperty(PropertyName = "deadline")]
        public DateTime? Deadline { get; set; }

        [JsonProperty(PropertyName = "users")]
        public IList<UserModel> Users { get; set; }
    }
}