using System;
using System.Collections.Generic;
using System.Linq;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface ISubjectStore: IStore<Subject>
    {
        IQueryable<Subject> GetByUser(Guid userId);
        void AddToGroup(Subject subject, Guid groupId);
        void RemoveFromGroup(Subject subject, Guid groupId);
        IList<Group> GetGroups(Guid subjectId);
    }
}