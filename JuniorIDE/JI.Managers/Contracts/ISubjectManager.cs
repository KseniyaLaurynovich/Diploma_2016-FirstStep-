using System;
using System.Collections.Generic;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface ISubjectManager : IManager<Subject>
    {
        IList<Subject> FindByUserId(string userId);
    }
}
