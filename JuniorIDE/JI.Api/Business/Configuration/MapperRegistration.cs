using System;
using ExpressMapper;
using JI.Api.Models;
using JI.Common.Contracts.Contracts;
using JI.Managers.Models;
using JI.Identity.Models;

namespace JI.Api.Business.Configuration
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<RegisterModel, ApplicationUser>();
            Mapper.Register<ApplicationUser, RegisterModel> ();

            Mapper.Register<AccountInfoModel, ApplicationUser>();
            Mapper.Register<ApplicationUser, AccountInfoModel> ();

            Mapper.Register<UserModel, ApplicationUser>();
            Mapper.Register<ApplicationUser, UserModel> ();

            Mapper.Register<RoleModel, ApplicationRole>();
            Mapper.Register<ApplicationRole, RoleModel> ();

            Mapper.Register<Subject, SubjectModel>();
            Mapper.Register<SubjectModel, Subject>();

            Mapper.Register<Group, GroupModel>();
            Mapper.Register<GroupModel, Group>();

            Mapper.Register<Task, TaskModel>();
            Mapper.Register<TaskModel, Task>();
        }
    }
}