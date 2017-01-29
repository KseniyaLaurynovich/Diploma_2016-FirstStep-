using System.ComponentModel.DataAnnotations;

namespace JI.Api.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}