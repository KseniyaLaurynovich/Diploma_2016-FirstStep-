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

        public bool IsShared { get; set; }

        public bool IsVisible { get; set; }

        public IList<Test> Tests { get; set; }
    }
}
