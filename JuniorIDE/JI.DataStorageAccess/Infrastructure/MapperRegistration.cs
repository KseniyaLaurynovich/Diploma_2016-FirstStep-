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
            Mapper.Register<Group, ApplicationGroup>()
                .Member(dest => dest.Id, src => src.Id.ToString());
            Mapper.Register<ApplicationGroup, Group>()
                .Ignore(dest => dest.Id)
                .After((appGroup, group) =>
                {
                    if (appGroup.Id != null)
                    {
                        group.Id = new Guid(appGroup.Id);
                    }
                }); 

            Mapper.Register<User, ApplicationUser>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Ignore(dest => dest.Roles)
                .Ignore(dest => dest.Groups)
                .After((user, appUser) =>
                {
                    appUser.Groups = user.UserGroups
                        ?.Select(ug => Mapper.Map<Group, ApplicationGroup>(ug.Group))
                        .ToList();

                    appUser.Roles = user.UserRoles
                        .Select(ur => ur.Role.Name)
                        .ToList();
                });

            Mapper.Register<ApplicationUser, User>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.UserGroups)
                .Ignore(dest => dest.UserRoles)
                .After((appUser, user) =>
                {
                    var userId = appUser.Id != null
                        ? new Guid(appUser.Id)
                        : Guid.Empty;

                    user.Id = userId;

                    user.UserRoles = appUser.Roles
                        ?.Select(r => new UserRole
                        {
                            UserId = userId,
                            Role = new Role { Name = r }
                        })
                        .ToList();

                    user.UserGroups = appUser.Groups
                        ?.Select(g => new UserGroup
                        {
                            UserId = userId,
                            Group = Mapper.Map<ApplicationGroup, Group>(g)
                        })
                        .ToList();
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
