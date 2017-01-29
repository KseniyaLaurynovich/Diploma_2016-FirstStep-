﻿using JI.DataStorageAccess.Repositories.Contracts;
using JI.DataStorageAccess.Repositories.Models;

namespace JI.DataStorageAccess.Repositories.Linq2DbRepositories
{
    internal class CommentsRepository 
        : BaseRepository<Comment>, ICommentsRepository
    {
    }
}
