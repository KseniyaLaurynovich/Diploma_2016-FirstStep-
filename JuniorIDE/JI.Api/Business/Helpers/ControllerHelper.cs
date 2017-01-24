using System.Linq;
using System.Web.Http.ModelBinding;

namespace JI.Api.Business.Helpers
{
    public class ControllerHelper
    {
        public static string[] GetErrosFromModelState(ModelStateDictionary modelState)
        {
            return modelState.Values.SelectMany(value => value.Errors.Select(error => error.ErrorMessage)).ToArray();
        }
    }
}