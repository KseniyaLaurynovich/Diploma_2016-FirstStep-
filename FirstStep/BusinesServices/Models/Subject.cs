using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinesServices.Models
{
    public class Subject
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        [Required]
        public string Name { get; set; }

        public IList<Task> Tasks { get; set; }
    }
}
