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
            Mapper.Register<Task, Models.Task>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.SubjectId, src => src.SubjectId.ToString());

            Mapper.Register<Models.Task, Task>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.SubjectId)
                .After((appSubject, subject) =>
                {
                    if (appSubject.Id != null)
                    {
                        subject.Id = new Guid(appSubject.Id);
                    }
                    if (appSubject.SubjectId != null)
                    {
                        subject.SubjectId = new Guid(appSubject.SubjectId);
                    }
                });

            Mapper.Register<Test, Models.Test>()
               .Member(dest => dest.Id, src => src.Id.ToString())
               .Member(dest => dest.TaskId, src => src.TaskId.ToString())
               .Member(dest => dest.OutputFile, src => src.OutputFile.ToString())
               .Member(dest => dest.InputFile, src => src.InputFile.ToString());

            Mapper.Register<Models.Test, Test>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.TaskId)
                .After((appSubject, subject) =>
                {
                    if (appSubject.Id != null)
                    {
                        subject.Id = new Guid(appSubject.Id);
                    }
                    if (appSubject.TaskId != null)
                    {
                        subject.TaskId = new Guid(appSubject.TaskId);
                    }
                    if (appSubject.OutputFile != null)
                    {
                        subject.OutputFile = new Guid(appSubject.OutputFile);
                    }
                    if (appSubject.InputFile != null)
                    {
                        subject.InputFile = new Guid(appSubject.InputFile);
                    }
                });

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
