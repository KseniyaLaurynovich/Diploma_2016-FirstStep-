using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JI.Services.Models
{
    public class Subject
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public IList<Task> Tasks { get; set; }

        public IList<Group> AssignGroups { get; set; }
    }
}
