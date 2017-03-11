using System;
using ExpressMapper;
using JI.Common.Contracts.Contracts;
using JI.DataStorageAccess.Models;

namespace JI.Managers.Infrastructure
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<Subject, Models.Subject>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.UserId, src => src.UserId.ToString());
            Mapper.Register<Models.Subject, Subject>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.UserId)
                .After((appSubject, subject) =>
                {
                    if (appSubject.Id != null)
                    {
                        subject.Id = new Guid(appSubject.Id);
                    }
                    if (appSubject.UserId != null)
                    {
                        subject.UserId = new Guid(appSubject.UserId);
                    }
                });

            Mapper.Register<Group, Models.Group>()
                .Member(dest => dest.Id, src => src.Id.ToString());
            Mapper.Register<Models.Group, Group>()
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
