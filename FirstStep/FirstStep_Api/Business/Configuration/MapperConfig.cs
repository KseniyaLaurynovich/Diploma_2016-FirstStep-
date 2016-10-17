using ExpressMapper;
using Storage = FirstStep_Storage.Models;
using Api = FirstStep_Api.Models;

namespace FirstStep_Api.Business.Configuration
{
    public static class MapperConfig
    {
        public static void Initialize()
        {
            Mapper.Register<Storage.Subject, Api.Subject>();
        }
    }
}