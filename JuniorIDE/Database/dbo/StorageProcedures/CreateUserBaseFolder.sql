CREATE PROCEDURE [dbo].[CreateUserBaseFolder]
	@folderName varchar(MAX)
AS

	DECLARE @parentdir table(path hierarchyid not null);

	INSERT INTO [dbo].[Files] (name,is_directory) 
	OUTPUT INSERTED.path_locator into @parentdir
	SELECT @folderName, 1
GO

--USE [FirstStep_Db]
--GO
----SELECT FileTableRootPath('FileTable')  [FileTable Root Path]
----GO

--	INSERT INTO [dbo].[FileTable] (name,is_directory) 
--	OUTPUT INSERTED.path_locator
--	SELECT 'test folder 4', 1

	
--GO
