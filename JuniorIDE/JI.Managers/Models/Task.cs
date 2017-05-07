using System;
using System.Collections.Generic;

namespace JI.Managers.Models
{
    public class Task
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string SubjectId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public bool AutoTested { get; set; }
        public string OutputFileName { get; set; }

        public bool IsShared { get; set; }

        public bool IsVisible { get; set; }

        public bool Testing { get; set; }

        public int? Mark { get; set; }

        public bool HasUploadedProject { get; set; }

        public bool IsPassed { get; set; }

        public Subject Subject { get; set; }

        public IList<Test> Tests { get; set; }

        public IList<TaskDeadline> Deadlines { get; set; }
    }
}
