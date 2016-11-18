using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;

namespace FirstStep_Api.Business.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ClaimsIdentity GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            var userIdentity = manager.CreateIdentity(this, authenticationType);
            return userIdentity;
        }
    }
}