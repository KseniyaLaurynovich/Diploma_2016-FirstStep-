using System.Collections.Generic;

namespace JI.Services.Business.Models
{
    public class ServiceResult<T> : ServiceResult
        where T : class
    {
        public T Result { get; set; }

        public static ServiceResult<T> Success(T result)
        {
            return new ServiceResult<T>
            {
                Result = result,
                Succeeded = true
            };
        }

        public new static ServiceResult<T> Failed(params string[] errors)
        {
            return new ServiceResult<T>(errors);
        }

        public ServiceResult(string[] errors)
        {
            Succeeded = false;
            Errors = errors;
        }

        public ServiceResult()
        {
            Succeeded = true;
        }
    }

    public class ServiceResult 
    {
        public bool Succeeded { get; protected set; }

        public IEnumerable<string> Errors { get; protected set; }

        public static ServiceResult Success => new ServiceResult();

        public static ServiceResult Failed(params string[] errors)
        { 
            return new ServiceResult(errors);
        }

        protected ServiceResult(IEnumerable<string> errors)
        {
            Succeeded = false;
            Errors = errors;
        }

        protected ServiceResult()
        {
            Succeeded = true;
        }
    }
}
