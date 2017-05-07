using System.IO;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Contracts;
using Microsoft.SqlServer.Types;
using FileInfo = JI.Managers.Models.FileInfo;

namespace JI.Managers.Managers
{
    internal class FileManager : IFileManager
    {
        private readonly IFileStore _fileStore;

        public FileManager(IFileStore fileStore)
        {
            _fileStore = fileStore;
        }

        public FileInfo GetFile(string fileId)
        {
            var file = _fileStore.FindById(SqlHierarchyId.Parse(fileId));

            if (file != null)
                return new FileInfo
                {
                    Name = file.Name,
                    Stream = new MemoryStream(file.Data)
                };

            return null;
        }

        public void Dispose()
        {
            _fileStore?.Dispose();
        }
    }
}
