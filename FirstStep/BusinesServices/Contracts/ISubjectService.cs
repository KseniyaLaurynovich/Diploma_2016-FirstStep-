using BusinesModels;
using System.Collections.Generic;

namespace BusinesServices.Contracts
{
    public interface ISubjectService
    {
        IList<Subject> GetByUser(string userId);
        void Save(Subject subject);
        void Delete(string id);
    }
}
