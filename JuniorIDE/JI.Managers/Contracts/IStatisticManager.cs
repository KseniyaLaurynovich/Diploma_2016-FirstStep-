﻿using System;
using System.Collections.Generic;
using JI.Managers.Business.Models;
using JI.Managers.Models;

namespace JI.Managers.Contracts
{
    public interface IStatisticManager : IDisposable
    {
        ServiceResult<IList<TryingHistory>> Get(string userId, string taskId);
        ServiceResult<IList<GroupWithUsers>> GetGroupsWithUsers(string taskId);
    }
}
