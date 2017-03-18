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

            Mapper.Register<Test, TestModel>()
                .Member(dest => dest.InputFile, src => new FileModel { Id = src.InputFile })
                .Member(dest => dest.OutputFile, src => new FileModel { Id = src.OutputFile });
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