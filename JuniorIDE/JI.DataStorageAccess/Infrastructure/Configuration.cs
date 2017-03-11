using JI.Common.Contracts.Contracts;

namespace JI.DataStorageAccess.Infrastructure
{
    public class Configuration : IGlobalConfiguration 
    {
        public void Configure()
        {
            LinqToDB.Common.Configuration.Linq.AllowMultipleQuery = true;
        }
    }
}
