using System.ComponentModel.DataAnnotations;

namespace JI.Api.Models
{
    public class CreateRoleModel
    {
        [Required]
        public string Name { get; set; }
    }
}