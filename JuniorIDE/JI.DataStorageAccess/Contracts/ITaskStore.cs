﻿using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Contracts
{
    public interface ITaskStore : IStore<Task>
    {
        Task FindByIdAndGroups(Guid id, Guid[] groupIds);
        IList<Test> GetTests(Task task);
        void AddTest(Task task, Test test);
        void RemoveTest(Task task, Test test);
        IList<Task> FindByGroups(Guid[] groupIds);
        IDictionary<Group, User[]> GetAssignedUsers(Guid taskId);
    }
}
