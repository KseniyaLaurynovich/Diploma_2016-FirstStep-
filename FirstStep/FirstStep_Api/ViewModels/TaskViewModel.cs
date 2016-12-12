using System.ComponentModel.DataAnnotations;

namespace FirstStep_Api.ViewModels
{
    public class TaskViewModel
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public SubjectViewModel Subject { get; set; }
    }
}