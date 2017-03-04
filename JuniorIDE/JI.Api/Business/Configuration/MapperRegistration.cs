using System;
using ExpressMapper;
using JI.Api.Models;
using JI.Common.Mapper.Contracts;
using JI.Identity.Models;
using JI.Services.Models;

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

            Mapper.Register<Subject, SubjectModel>()
                .Member(dest => dest.Id, src => src.Id.ToString())
                .Member(dest => dest.UserId, src => src.UserId.ToString());
            Mapper.Register<SubjectModel, Subject>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.UserId)
                .After((subjectModel, subject) =>
                {
                    subject.Id = 
                        subjectModel.Id != null 
                        ? new Guid(subjectModel.Id) 
                        : Guid.Empty;

                    subject.UserId = 
                        subjectModel.UserId != null 
                        ? new Guid(subjectModel.UserId) 
                        : Guid.Empty;
                });
        }
    }
}