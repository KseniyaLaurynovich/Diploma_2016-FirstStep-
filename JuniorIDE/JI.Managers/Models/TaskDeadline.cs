using System;

namespace JI.Managers.Models
{
    public class TaskDeadline
    {
        public string Id { get; set; }

        public string TaskId { get; set; }

        public string GroupSubjectId { get; set; }

        public DateTime Deadline { get; set; }
    }
}
