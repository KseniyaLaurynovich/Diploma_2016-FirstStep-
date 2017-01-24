using ExpressMapper;
using JI.DataStorageAccess.Models;
using File = JI.DataStorageAccess.Models.File;
using Group = JI.DataStorageAccess.Models.Group;
using Subject = JI.DataStorageAccess.Models.Subject;
using Task = JI.DataStorageAccess.Models.Task;

namespace JI.Services.Infrastructure
{
    public class MapperRegistration //: IMapperRegistration
    {
        public void Register()
        {
            Mapper.Register<Subject, Models.Subject>();
            Mapper.Register<Task, Models.Task>();
            Mapper.Register<File, Models.File>();
            Mapper.Register<Group, Models.Group>();
        } 
    }
}
