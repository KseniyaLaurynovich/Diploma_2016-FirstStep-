using System;

namespace JI.Managers.Models
{
    public class Project
    {
        public string Id { get; set; }

        public string TaskId { get; set; }

        public string UserId { get; set; }

        public string ProjectFolder { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ModificationDate { get; set; }

        public bool Closed { get; set; }

        public int? Mark { get; set; }
    }
}
