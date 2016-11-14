using FirstStep_Storage.Contracts;
using FirstStep_Storage.Models;
using LinqToDB.Data;
using System.Linq;

namespace FirstStep_Storage.Repositories
{
    internal class StorageProcedureRepository : IStorageProcedureRepository
    {
        public File GetUserBaseFolder(string userId)
        {
            using (var db = new FirstStepDb())
            {
                var file = db.QueryProc<File>("GetUserBaseFolder",
                    new DataParameter("userId", userId))
                    .FirstOrDefault();

                return file;
            }
        }

        public void CreateUserBaseFolder(string userId)
        {
            using (var db = new FirstStepDb())
            {
                db.ExecuteProc("CreateUserBaseFolder",
                    new DataParameter("folderName", userId));
            }
        }
    }
}
