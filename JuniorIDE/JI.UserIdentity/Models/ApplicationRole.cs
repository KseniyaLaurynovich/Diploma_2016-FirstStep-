using Microsoft.AspNet.Identity;

namespace JI.UserIdentity.Models
{
    public class ApplicationRole : IRole<string>
    {
        public string Id { get; }
        public string Name { get; set; }
    }
}
