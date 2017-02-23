using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JI.Services.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public string AdditionalInfo { get; set; }

        [Required]
        public Guid SubjectId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModified { get; set; }

        public IList<Test> Tests { get; set; }

    }
}
