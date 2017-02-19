using System;
using Microsoft.AspNet.Identity;

namespace JI.Identity.Models
{
    public class ApplicationUser : IUser
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Patronymic { get; set; }

        public bool IsEmailConfirmed { get; set; }

        public string PasswordHash { get; set; }

        public string SecurityStamp { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool IsActivated { get; set; }
    }
}
