using System;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class DeadlineModel
    {
        [JsonProperty(PropertyName = "groupId")]
        public string GroupId { get; set; }

        [JsonProperty(PropertyName = "groupName")]
        public string GroupName { get; set; }

        [JsonProperty(PropertyName = "deadline")]
        public DateTime? Deadline { get; set; }
    }
}