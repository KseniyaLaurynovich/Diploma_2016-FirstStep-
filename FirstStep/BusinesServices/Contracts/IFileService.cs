using BusinesModels;
using System.IO;

namespace BusinesServices.Contracts
{
    public interface IFileService
    {
        void LoadProjectForUser(string userId, Stream stream, string name, out string[] errors);
    }
}
