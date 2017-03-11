using System;
using System.Collections.Generic;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface ISubjectManager : IDisposable
    {
        IList<Subject> FindByUserId(string userId);
        ServiceResult<Subject> Save(Subject subject);
        ServiceResult Delete(string id);
        IList<Subject> GetAll();
        Subject FindById(string subjectId);
    }
}
