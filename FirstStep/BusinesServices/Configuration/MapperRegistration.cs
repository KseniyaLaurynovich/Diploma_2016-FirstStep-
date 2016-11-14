using ExpressMapper;
using Storage = FirstStep_Storage.Models;
using Busines = BusinesModels;
using FirstStep_Common;

namespace BusinesServices.Configuration
{
    public class MapperRegistration : IMapperRegistration
    {
        public void Register()
        {
            Mapper.Register<Storage.Subject, Busines.Subject>();
            Mapper.Register<Storage.Task, Busines.Task>();
            Mapper.Register<Storage.File, Busines.File>();
        } 
    }
}
