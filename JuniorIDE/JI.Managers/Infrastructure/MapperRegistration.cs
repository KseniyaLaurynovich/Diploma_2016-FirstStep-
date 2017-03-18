using System;
using ExpressMapper;
using JI.Common.Contracts.Contracts;
using JI.DataStorageAccess.Business.Extensions;
using JI.DataStorageAccess.Models;
using Microsoft.SqlServer.Types;

namespace JI.Managers.Infrastructure
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<File, Models.File>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.ParentId, 
                    src => src.ParentId.IsNull ? null : src.ParentId.ToString());

            Mapper.Register<Models.File, File>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.ParentId)
                .After((appFile, file) =>
                {
                    if (appFile.Id != null)
                    {
                        file.Id = SqlHierarchyId.Parse(appFile.Id);
                    }
                    if (appFile.ParentId != null)
                    {
                        file.ParentId = appFile.ParentId == null 
                            ? SqlHierarchyId.Null 
                            : SqlHierarchyId.Parse(appFile.ParentId);
                    }
                });

            Mapper.Register<Task, Models.Task>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.SubjectId, src => src.SubjectId.ToString());

            Mapper.Register<Models.Task, Task>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.SubjectId)
                .Ignore(dest => dest.TempFolder)
                .After((appTask, task) =>
                {
                    if (appTask.Id != null)
                    {
                        task.Id = new Guid(appTask.Id);
                    }
                    if (appTask.SubjectId != null)
                    {
                        task.SubjectId = new Guid(appTask.SubjectId);
                    }
                });

            Mapper.Register<Test, Models.Test>()
               .Member(dest => dest.Id, src => src.Id.ToString())
               .Member(dest => dest.TaskId, src => src.TaskId.ToString())
               .Member(dest => dest.OutputFile, src => src.OutputFile.ToValidString())
               .Member(dest => dest.InputFile, src => src.InputFile.ToValidString());

            Mapper.Register<Models.Test, Test>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.TaskId)
                .Ignore(dest => dest.OutputFile)
                .Ignore(dest => dest.InputFile)
                .After((appTest, test) =>
                {
                    if (appTest.Id != null)
                    {
                        test.Id = new Guid(appTest.Id);
                    }
                    if (appTest.TaskId != null)
                    {
                        test.TaskId = new Guid(appTest.TaskId);
                    }
                    if (appTest.OutputFile != null)
                    {
                        test.OutputFile = appTest.OutputFile == null
                            ? SqlHierarchyId.Null
                            : SqlHierarchyId.Parse(appTest.OutputFile);
                    }
                    if (appTest.InputFile != null)
                    {
                        test.InputFile = appTest.OutputFile == null
                            ? SqlHierarchyId.Null
                            : SqlHierarchyId.Parse(appTest.InputFile);
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
