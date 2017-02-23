using System;
using System.ComponentModel.DataAnnotations;

namespace JI.Services.Models
{
    public class Test
    {
        public Guid Id { get; set; }

        public Guid TaskId { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsFiles { get; set; }

        public string InputArguments { get; set; }

        public string OutputArguments { get; set; }

        public byte[] InputFile { get; set; }

        public byte[] OutputFile { get; set; }

        [Required]
        public int Weight { get; set; }
    }
}