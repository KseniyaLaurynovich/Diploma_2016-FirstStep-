using FirstStep_Storage.Models;
using System;
using System.Collections.Generic;
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

        public IList<Task> Tasks { get; set; }
    }
}