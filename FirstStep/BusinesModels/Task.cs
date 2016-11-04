using System;
using System.ComponentModel.DataAnnotations;

namespace BusinesModels
{
    public class Task
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string AdditionalInfo { get; set; }

        public int SubjectId { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
