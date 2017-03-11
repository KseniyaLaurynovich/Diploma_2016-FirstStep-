using System.Linq;

namespace JI.Managers.Business.Models
{
    public static class ServiceResultExtentions
    {
        public static ServiceResult<T> Convert<T>(this ServiceResult serviceResult)
            where T: class
        {
            if (serviceResult.Succeeded)
            {
                return ServiceResult<T>.Success(null);
            }
            return ServiceResult<T>.Failed(serviceResult.Errors.ToArray());
        }
    }
}
