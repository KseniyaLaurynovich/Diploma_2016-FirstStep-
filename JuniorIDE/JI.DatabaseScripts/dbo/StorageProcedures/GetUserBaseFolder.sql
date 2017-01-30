CREATE PROCEDURE [dbo].[GetUserBaseFolder]
	@userId varchar(MAX)
AS
	SELECT Ft.name, FT.path_locator, FT.parent_path_locator, FT.file_stream, FT.is_directory, FT.file_stream.GetFileNamespacePath(1,0) AS [Path]
	FROM [Files] FT
	WHERE FT.Name = @userId AND FT.parent_path_locator IS NULL
RETURN 0
--//return all data