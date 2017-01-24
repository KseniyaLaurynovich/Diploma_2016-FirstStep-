using System;
using ExpressMapper;
using JI.Common.Mapper.Contracts;
using JI.DataStorageAccess.Models;
using JI.UserIdentity.Models;

namespace JI.UserIdentity.Infrastructure
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<User, ApplicationUser>()
                .Member(dest => dest.Id, src => src.Id.ToString());

            Mapper.Register<ApplicationUser, User>()
                .Ignore(dest => dest.Id)
                .After((appUser, user) =>
                {
                    if (appUser.Id != null)
                    {
                        user.Id = new Guid(appUser.Id);
                    }
                });
        }
    }
}
