﻿using System.Collections;
using System.Collections.Generic;
using JI.Identity.Models;
using JI.UserIdentity.Interfaces;
using Microsoft.AspNet.Identity;

namespace JI.UserIdentity.Business
{
    public class ApplicationUserRolesValidator : IRolesValidator<ApplicationUser, string>
    {
        public IdentityResult ValidateUserRoles(IList<string> roles)
        {
            if (roles.Contains("Teacher") && roles.Contains("Student"))
            {
                return new IdentityResult(Resources.Resources.InvalidRolesSet);
            }
            return IdentityResult.Success;
        }
    }
}
