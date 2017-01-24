using Microsoft.AspNet.Identity;

namespace JI.UserIdentity.Models
{
    public class ApplicationUser : IUser
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Patronymic { get; set; }

        public bool IsActive { get; set; }

        public string PasswordHash { get; set; }
    }
}
