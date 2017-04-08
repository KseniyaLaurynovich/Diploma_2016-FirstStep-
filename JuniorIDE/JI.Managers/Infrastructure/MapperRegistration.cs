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
            #region File

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

            #endregion

            #region Task

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

            #endregion

            #region Test

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

            #endregion

            #region Subject

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

            #endregion

            #region Group

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

            #endregion

            #region TaskDeadline

            Mapper.Register<TaskDeadline, Models.TaskDeadline>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.GroupSubjectId, src => src.GroupSubjectId.ToString())
                .Member(dest => dest.TaskId, src => src.TaskId.ToString());
            Mapper.Register<Models.TaskDeadline, TaskDeadline>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.GroupSubjectId)
                .Ignore(dest => dest.TaskId)
                .After((appDeadline, deadline) =>
                {
                    if (appDeadline.Id != null)
                    {
                        deadline.Id = new Guid(appDeadline.Id);
                    }
                    if (appDeadline.GroupSubjectId != null)
                    {
                        deadline.GroupSubjectId = new Guid(appDeadline.GroupSubjectId);
                    }
                    if (appDeadline.TaskId != null)
                    {
                        deadline.TaskId = new Guid(appDeadline.TaskId);
                    }
                });

            #endregion

            #region Project

            Mapper.Register<Project, Models.Project>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.UserId, src => src.UserId.ToString())
                .Member(dest => dest.TaskId, src => src.TaskId.ToString())
                .Member(dest => dest.ProjectFolder, src => src.ProjectFolder.ToString());

            Mapper.Register<Models.Project, Project>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.UserId)
                .Ignore(dest => dest.TaskId)
                .Ignore(dest => dest.ProjectFolder)
                .After((appProject, project) =>
                {
                    if (appProject.Id != null)
                    {
                        project.Id = new Guid(appProject.Id);
                    }

                    if (appProject.TaskId != null)
                    {
                        project.TaskId = new Guid(appProject.TaskId);
                    }

                    if (appProject.UserId != null)
                    {
                        project.UserId = new Guid(appProject.UserId);
                    }

                    if (appProject.ProjectFolder != null)
                    {
                        project.ProjectFolder = appProject.ProjectFolder == null
                            ? SqlHierarchyId.Null
                            : SqlHierarchyId.Parse(appProject.ProjectFolder);
                    }
                });

            #endregion
        }
    }
}
