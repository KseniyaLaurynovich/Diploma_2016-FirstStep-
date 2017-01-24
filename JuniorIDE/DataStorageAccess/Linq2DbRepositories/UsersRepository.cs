using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;

namespace JI.DataStorageAccess.Linq2DbRepositories
{
    internal class UsersRepository
        : BaseRepository<User>, IUsersRepository
    {
    }
}
