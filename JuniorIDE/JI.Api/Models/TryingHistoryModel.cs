using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class TryingHistoryModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "projectId")]
        public string ProjectId { get; set; }

        [JsonProperty(PropertyName = "dateTime")]
        public DateTime DateTime { get; set; }

        [JsonProperty(PropertyName = "compiled")]
        public bool Compiled { get; set; }

        [JsonProperty(PropertyName = "items")]
        public IList<TryingModel> Items { get; set; }
    }
}