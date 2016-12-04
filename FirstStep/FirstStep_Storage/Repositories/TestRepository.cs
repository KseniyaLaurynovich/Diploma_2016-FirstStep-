using System.Linq;
using FirstStep_Storage.Models;
using LinqToDB;

namespace FirstStep_Storage.Repositories
{
    internal class TestRepository: DataRepository<Test>, ITestRepository
    {
    }
}
