using System;
using System.Linq;
using ExpressMapper;
using JI.Common.Contracts.Contracts;
using JI.DataStorageAccess.Models;
using JI.Identity.Models;

namespace JI.DataStorageAccess.Infrastructure
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<User, ApplicationUser>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.Roles, src => src.Roles.Select(r => r.Name));
            Mapper.Register<ApplicationUser, User>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.Roles)
                .After((appUser, user) =>
                {
                    if (appUser.Id != null)
                    {
                        user.Id = new Guid(appUser.Id);
                    }
                });

            Mapper.Register<Role, ApplicationRole>()
                .Member(dest => dest.Id, src => src.Id.ToString());
            Mapper.Register<ApplicationRole, Role>()
                .Ignore(dest => dest.Id)
                .After((appRole, role) =>
                {
                    if (appRole.Id != null)
                    {
                        role.Id = new Guid(appRole.Id);
                    }
                });
        }
    }
}
