﻿using BusinesServices.Contracts;
using BusinesServices.Helpers;
using ExpressMapper;
using System.IO;
using System.Linq;
using DataStorageAccess.Contracts;
using File = DataStorageAccess.Models.File;

namespace BusinesServices.Services
{
    internal class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IStorageProcedureRepository _storageProcedures;

        public FileService(IFileRepository fileRepository, 
            IStorageProcedureRepository storageProcedures)
        {
            _fileRepository = fileRepository;
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

            return Mapper.Map<File, BusinesServices.Models.File>(userFolderPath);
        }

        private bool IsHasTheSameSubfolder(BusinesServices.Models.File file, string subfolderName)
        {
            return _fileRepository
                .Items()
                .Any(f => f.ParentId == file.Id 
                    && f.Name.ToUpper().Equals(subfolderName.ToUpper()));
        }

    }
}