using System.IO;

namespace JI.Services.Contracts
{
    public interface IFileService
    {
        void LoadProjectForUser(string userId, Stream stream, string name, out string[] errors);
    }
}
