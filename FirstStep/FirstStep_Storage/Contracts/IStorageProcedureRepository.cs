using FirstStep_Storage.Models;

namespace FirstStep_Storage.Contracts
{
    public interface IStorageProcedureRepository
    {
        File GetUserBaseFolder(string userId);

        void CreateUserBaseFolder(string userId);
    }
}
