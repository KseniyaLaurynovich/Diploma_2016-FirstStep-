CREATE PROCEDURE [dbo].[GetPhysicalPath]
	@fileId hierarchyid
AS
	DECLARE @root varchar(MAX)
	SELECT @root = FileTableRootPath()

	SELECT @root + file_stream.GetFileNamespacePath()  
    FROM [dbo].[ProjectsFiles] 
	WHERE path_locator = @fileId

RETURN 0