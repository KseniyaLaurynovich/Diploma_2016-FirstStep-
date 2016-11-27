using BusinesServices.Models;
using BusinesServices.Contracts;
using BusinesServices.Helpers;
using ExpressMapper;
using FirstStep_Storage.Contracts;
using System.IO;
using System.Linq;
using Storage = FirstStep_Storage.Models;

namespace BusinesServices.Services
{
    internal class FileService : IFileService
    {
        private readonly IDataRepository _dataRepository;
        private readonly IStorageProcedureRepository _storageProcedures;

        public FileService(IDataRepository dataRepository, IStorageProcedureRepository storageProcedures)
        {
            _dataRepository = dataRepository;
            _storageProcedures = storageProcedures;
        }

        public void LoadProjectForUser(string userId, Stream stream, string name, out string[] errors)
        {
            errors = null;
            var baseFolder = GetUserBaseFolder(userId);

            using (stream)
            {
                var tempPath = FolderHelper.GetTempFolderPath();
                ArchiveHelper.UnZipCatalog(stream, name, tempPath);

                FolderHelper.CopyDirectory(tempPath, baseFolder.Path);
            }
        }

        private BusinesServices.Models.File GetUserBaseFolder(string userId)
        {
            var userFolderPath = _storageProcedures.GetUserBaseFolder(userId);

            if (userFolderPath == null)
            {
                _storageProcedures.CreateUserBaseFolder(userId);
                userFolderPath = _storageProcedures.GetUserBaseFolder(userId);
            }

            return Mapper.Map<Storage.File, BusinesServices.Models.File>(userFolderPath);
        }

        private bool IsHasTheSameSubfolder(BusinesServices.Models.File file, string subfolderName)
        {
            return _dataRepository.Items<Storage.File>()
                .Where(f => f.ParentId == file.Id 
                    && f.Name.ToUpper() == subfolderName.ToUpper())
                .Any();
        }

    }
}
