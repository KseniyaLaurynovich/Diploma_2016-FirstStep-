﻿using JI.DataStorageAccess.Identity.Linq2DbStores;
using JI.Identity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace JI.UserIdentity.Managers
{
    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        protected ApplicationRoleManager(IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            var appRoleManager = new ApplicationRoleManager(new ApplicationRoleStore());
            return appRoleManager;
        }
    }
}
