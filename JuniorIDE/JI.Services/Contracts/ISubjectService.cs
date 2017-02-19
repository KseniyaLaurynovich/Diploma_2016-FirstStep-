using System;
using System.Collections.Generic;
using JI.Services.Business;
using JI.Services.Models;

namespace JI.Services.Contracts
{
    public interface ISubjectService : IDisposable
    {
        IList<Subject> FindByUserId(string userId);
        ServiceResult Save(Subject subject);
        ServiceResult Delete(string id);
        IList<Subject> GetAll();
        Subject FindById(string subjectId);
    }
}
