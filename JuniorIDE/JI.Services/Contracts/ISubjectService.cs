using System.Collections.Generic;
using JI.Services.Models;

namespace JI.Services.Contracts
{
    public interface ISubjectService
    {
        IList<Subject> GetByUser(string userId);
        void Save(Subject subject);
        void Delete(string id);
        IList<Subject> GetAll();
        Subject GetById(string subjectId);
    }
}
