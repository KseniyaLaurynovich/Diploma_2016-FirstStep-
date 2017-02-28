using ExpressMapper;
using JI.Common.Mapper.Contracts;
using JI.DataStorageAccess.Repositories.Models;

namespace JI.Services.Infrastructure
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<Subject, Models.Subject>();
            Mapper.Register<Models.Subject, Subject>();

            Mapper.Register<Group, Models.Group>();
            Mapper.Register<Models.Group, Group>();
        }
    }
}
