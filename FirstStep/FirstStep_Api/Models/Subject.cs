using System;
using System.ComponentModel.DataAnnotations;

namespace FirstStep_Api.Models
{
    public class Subject
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        [Required]
        //[StringLength(2,10)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public int NumberOfTasks { get; set; }
    }
}