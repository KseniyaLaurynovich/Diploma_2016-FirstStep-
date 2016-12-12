ALTER DATABASE [$(DatabaseName)]
add filegroup FileGroup_Projects contains filestream;
go

ALTER DATABASE [$(DatabaseName)]
 SET FILESTREAM ( NON_TRANSACTED_ACCESS = FULL, DIRECTORY_NAME = 'FirstStep_Projects' )  
go

ALTER DATABASE [$(DatabaseName)]
ADD FILE
  (NAME = 'Files', FILENAME = 'D:\FileStream\SMT')
to filegroup FileGroup_Projects;
go