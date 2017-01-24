IF NOT EXISTS (SELECT * FROM sys.filegroups WHERE name='FileGroup_ProjectsFiles')
ALTER DATABASE [$(DatabaseName)]
ADD FILEGROUP FileGroup_ProjectsFiles CONTAINS FILESTREAM;
GO

ALTER DATABASE [$(DatabaseName)]
SET FILESTREAM ( NON_TRANSACTED_ACCESS = FULL, DIRECTORY_NAME = 'JuniorIDE_ProjectsFiles' )  
GO

ALTER DATABASE [$(DatabaseName)]
ADD FILE (NAME = 'ProjectsFiles', FILENAME = 'D:\FileStream\Junior') TO FILEGROUP FileGroup_ProjectsFiles;
GO