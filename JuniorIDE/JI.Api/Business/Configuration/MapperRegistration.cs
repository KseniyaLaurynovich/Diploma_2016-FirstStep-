using System.Linq;
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
            Mapper.Register<RegisterModel, ApplicationUser>()
                .Ignore(dest => dest.Groups)
                .Ignore(dest => dest.Roles)
                .After((registerModel, user) =>
                {
                    if (registerModel.Role != null)
                    {
                        user.Roles.Add(registerModel.Role);
                    }
                    if (registerModel.Group != null)
                    {
                        //user.Groups.Add(registerModel.Group);
                    }
                });
            Mapper.Register<ApplicationUser, RegisterModel> ();

            Mapper.Register<AccountInfoModel, ApplicationUser>();
            Mapper.Register<ApplicationUser, AccountInfoModel> ();

            Mapper.Register<GroupModel, ApplicationGroup>();
            Mapper.Register<ApplicationGroup, GroupModel>();

            Mapper.Register<UserModel, ApplicationUser>()
                 .Ignore(dest => dest.Groups)
                 .Ignore(dest => dest.Roles)
                 .After((model, user) =>
                 {
                    user.Groups = model.Groups
                        ?.Select(Mapper.Map<GroupModel, ApplicationGroup>)
                        .ToList();

                    user.Roles = model.Roles;
                 }); 

            Mapper.Register<ApplicationUser, UserModel>()
                .Ignore(dest => dest.Groups)
                .Ignore(dest => dest.Roles)
                .After((user, model) =>
                {
                    model.Groups = user.Groups
                        ?.Select(Mapper.Map<ApplicationGroup, GroupModel>)
                        .ToList();

                    model.Roles = user.Roles;
                });

            Mapper.Register<UserInfoModel, ApplicationUser>();
            Mapper.Register<ApplicationUser, UserInfoModel>();

            Mapper.Register<RoleModel, ApplicationRole>();
            Mapper.Register<ApplicationRole, RoleModel> ();

            Mapper.Register<Subject, SubjectModel>();
            Mapper.Register<SubjectModel, Subject>();

            Mapper.Register<Group, GroupModel>();
            Mapper.Register<GroupModel, Group>();

            Mapper.Register<Task, TaskModel>();
            Mapper.Register<TaskModel, Task>();

            Mapper.Register<TryingHistory, TryingHistoryModel>();
            Mapper.Register<TryingHistoryModel, TryingHistory>();

            Mapper.Register<TryingHistory, ExtendedTryingHistoryModel>()
                .Member(dest => dest.ExtendedItems, src => src.Items.Select(Mapper.Map<Trying, ExtendedTryingModel>).ToList());

            Mapper.Register<ExtendedTryingHistoryModel, TryingHistory>();

            Mapper.Register<Trying, TryingModel>();
            Mapper.Register<TryingModel, Trying>();

            Mapper.Register<Trying, ExtendedTryingModel>();
            Mapper.Register<ExtendedTryingModel, Trying>();

            Mapper.Register<Task, TaskPluginModel>()
                .After((task, model) =>
                {
                    model.SubjectName = task.Subject.Name;
                    model.Deadline = task.Deadlines.FirstOrDefault()?.Deadline;
                });

            Mapper.Register<Test, TestModel>()
                .Member(dest => dest.InputFile, src => new FileModel { Id = src.InputFile, Name = src.InputFileName })
                .Member(dest => dest.OutputFile, src => new FileModel { Id = src.OutputFile, Name = src.OutputFileName });
            Mapper.Register<TestModel, Test>()
                .Ignore(dest => dest.OutputFile)
                .Ignore(dest => dest.InputFile)
                .After((appTest, test) =>
                {
                    if (appTest.OutputFile != null)
                    {
                        test.OutputFile = string.IsNullOrEmpty(appTest.OutputFile.Id)
                            ? null
                            : appTest.OutputFile.Id;
                    }
                    if (appTest.InputFile != null)
                    {
                        test.InputFile = string.IsNullOrEmpty(appTest.InputFile.Id)
                            ? null
                            : appTest.InputFile.Id;
                    }
                });
        }
    }
}