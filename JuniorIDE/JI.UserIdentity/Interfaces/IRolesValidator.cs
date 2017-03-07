﻿using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;

namespace JI.UserIdentity.Interfaces
{
    public interface IRolesValidator<TUser, TKey> 
        where TUser : class, IUser<string>
        where TKey : IEquatable<TKey>
    {
        IdentityResult ValidateUserRoles(IList<string> roles);
    }
}
