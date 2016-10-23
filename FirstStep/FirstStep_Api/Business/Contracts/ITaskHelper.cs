using FirstStep_Api.Models;
using System.Collections.Generic;

namespace FirstStep_Api.Business.Contracts
{
    public interface ITaskHelper
    {
        IList<Task> GetBySubjectId(int subjectId);
    }
}
