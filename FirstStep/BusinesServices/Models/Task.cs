using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinesServices.Models
{
    public class Task
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string AdditionalInfo { get; set; }

        [Required]
        public string SubjectId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public IList<Test> Tests { get; set; }

    }
}
