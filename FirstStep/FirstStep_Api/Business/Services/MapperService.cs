using ExpressMapper;

namespace FirstStep_Api.Business.Services
{
    public static class MapperService
    {
        public static T Map<K, T>(K obj)
        {
            return Mapper.Map<K, T>(obj);
        }
    }
}