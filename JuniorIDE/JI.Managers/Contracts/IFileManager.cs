using System;
using FileInfo = JI.Managers.Models.FileInfo;

namespace JI.Managers.Contracts
{
    public interface IFileManager : IDisposable
    {
        FileInfo GetFile(string fileId);
    }
}
