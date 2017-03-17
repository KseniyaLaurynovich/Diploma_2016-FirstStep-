using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class TaskModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        [Required]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "subjectId")]
        public string SubjectId { get; set; }

        [JsonProperty(PropertyName = "creationDate")]
        public DateTime CreationDate { get; set; }

        [JsonProperty(PropertyName = "modifiedData")]
        public DateTime LastModified { get; set; }

        [JsonProperty(PropertyName = "autoTested")]
        public bool AutoTested { get; set; }

        [JsonProperty(PropertyName = "isVisible")]
        public bool IsVisible { get; set; }

        [JsonProperty(PropertyName = "tests")]
        public IList<TestModel> Tests { get; set; }
    }
}