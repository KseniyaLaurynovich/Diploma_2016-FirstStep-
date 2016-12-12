using FirstStep_Storage.Models;
using FirstStep_Storage.Contracts;

namespace FirstStep_Storage.Repositories
{
    internal class CommentsRepository : DataRepository<Comment>, ICommentRepository
    {
    }
}
