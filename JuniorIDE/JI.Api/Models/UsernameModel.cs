using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class UsernameModel
    {
        [JsonProperty(PropertyName = "username")]
        [Required]
        public string Username { get; set; }
    }
}