CREATE PROCEDURE [dbo].[GetProjectFolder]
	@userId varchar(MAX),
	@projectFolder varchar(MAX)
AS
	SELECT FT.file_stream.GetFileNamespacePath(1,0)
	FROM [Files] FT
	LEFT JOIN [Files] PT
	ON FT.path_locator.GetAncestor(1) = PT.path_locator
	WHERE FT.Name = @projectFolder AND PT.Name = @userId AND PT.parent_path_locator IS NULL
RETURN 0