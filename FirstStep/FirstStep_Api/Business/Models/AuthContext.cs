using Microsoft.AspNet.Identity.EntityFramework;

namespace FirstStep_Api.Business.Models
{
    public class AuthContext : IdentityDbContext<ApplicationUser>
    {
        public AuthContext()
            : base("FirstStepDb", throwIfV1Schema: false)
        {
        }

        public static AuthContext Create()
        {
            return new AuthContext();
        }
    }
}