using System.Collections.Generic;
using System.Linq;

namespace JI.Services.Business
{
    public class ServiceResult<T> 
        where T : class
    {
        public T Result { get; protected set; }

        public bool Succeeded { get; protected set; }

        public IEnumerable<string> Errors { get; protected set; }

        public static ServiceResult<T> Success(T result)
        {
            return new ServiceResult<T>(result, true);
        }

        public static ServiceResult<T> Failed(params string[] errors)
        {
            return new ServiceResult<T>(errors);
        }

        protected ServiceResult(T result, bool success)
        {
            Result = result;
            Succeeded = success;
        }

        protected ServiceResult(IEnumerable<string> errors)
        {
            Succeeded = false;
            Errors = errors;
        }
    }

    public class ServiceResult
    {
        public bool Succeeded { get; protected set; }

        public IEnumerable<string> Errors { get; protected set; }

        public static ServiceResult Success()
        {
            return new ServiceResult { Succeeded = true };
        }

        public static ServiceResult Failed(params string[] errors)
        {
            return new ServiceResult(errors);
        }

        public ServiceResult<T> Convert<T>()
            where T : class
        {
            if (this.Succeeded)
            {
                return ServiceResult<T>.Success(null);
            }
            return ServiceResult<T>.Failed(this.Errors.ToArray());
        }

        protected ServiceResult(params string[] errors)
          : this((IEnumerable<string>) errors)
        {
        }

        protected ServiceResult(IEnumerable<string> errors)
        {
            Succeeded = false;
            Errors = errors;
        }
    }
}
