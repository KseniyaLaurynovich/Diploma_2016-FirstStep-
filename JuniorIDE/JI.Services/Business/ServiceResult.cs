using System.Collections.Generic;

namespace JI.Services.Business
{
    public class ServiceResult
    {
        private static readonly ServiceResult _success = new ServiceResult(true);

        public bool Succeeded { get; private set; }

        public IEnumerable<string> Errors { get; private set; }

        public static ServiceResult Success => _success;

        public ServiceResult(params string[] errors)
          : this((IEnumerable<string>) errors)
        {
        }

        public ServiceResult(IEnumerable<string> errors)
        {
            Succeeded = false;
            Errors = errors;
        }

        protected ServiceResult(bool success)
        {
            Succeeded = success;
            Errors = new string[0];
        }

        public static ServiceResult Failed(params string[] errors)
        {
            return new ServiceResult(errors);
        }
    }
}
