using System.Collections.Generic;
using System.Security.Claims;
using JI.Api.Business.Models;

namespace JI.Api.Business.Providers
{
    public static class ClaimsProvider
    {
        public static IEnumerable<Claim> GetClaims(ApplicationUser user)
        {
            var claims = new List<Claim>();

            return claims;
        }

        public static Claim CreateClaim(string type, string value)
        {
            return new Claim(type, value, ClaimValueTypes.String);
        }
    }
}