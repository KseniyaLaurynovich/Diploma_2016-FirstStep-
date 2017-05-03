using System;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class TaskPluginModel
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "subjectName")]
        public string SubjectName { get; set; }

        [JsonProperty(PropertyName = "deadline")]
        public DateTime? Deadline { get; set; }

        [JsonProperty(PropertyName = "isShared")]
        public bool IsShared { get; set; }

        [JsonProperty(PropertyName = "isClosed")]
        public bool IsClosed => Deadline.HasValue && Deadline.Value <= DateTime.Now;

        [JsonProperty(PropertyName = "isPassed")]
        public bool IsPassed { get; set; }

        [JsonProperty(PropertyName = "isDeadlineSoon")]
        public bool IsDeadlineSoon => Deadline.HasValue && Deadline.Value.AddDays(2) >= DateTime.Now;

        [JsonProperty(PropertyName = "autoTested")]
        public bool AutoTested { get; set; }

        [JsonProperty(PropertyName = "testing")]
        public bool Testing { get; set; }

        [JsonProperty(PropertyName = "waitingForMark")]
        public bool IsWaitingForMark => !IsShared && IsPassed && Mark == null;

        [JsonProperty(PropertyName = "mark")]
        public int? Mark { get; set; }

        [JsonProperty(PropertyName = "hasUploadedProject")]
        public bool HasUploadedProject { get; set; }
    }
}