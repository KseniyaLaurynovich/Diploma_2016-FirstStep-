using FirstStep_Api.Models;
using System.Collections.Generic;

namespace FirstStep_Api.Business.Contracts
{
    public interface ISubjectHelper
    {
        IList<Subject> GetSubjectsForUser(int userId);
        int Save(Subject subject);
        void Delete(int subjectId);
    }
}
