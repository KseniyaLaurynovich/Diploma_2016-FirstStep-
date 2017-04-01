CREATE PROCEDURE [dbo].[InsertIntoFileTable]
	@name nvarchar(255),
	@fileStream varbinary(MAX),
	@isFolder bit,
	@parent hierarchyid
AS
	DECLARE @new_path    VARCHAR(675)
	IF @parent IS NOT NULL
		BEGIN
			SELECT @new_path = @parent.ToString()     +
			CONVERT(VARCHAR(20), CONVERT(BIGINT, SUBSTRING(CONVERT(BINARY(16), NEWID()), 1, 6))) + '.' +
			CONVERT(VARCHAR(20), CONVERT(BIGINT, SUBSTRING(CONVERT(BINARY(16), NEWID()), 7, 6))) + '.' +
			CONVERT(VARCHAR(20), CONVERT(BIGINT, SUBSTRING(CONVERT(BINARY(16), NEWID()), 13, 4))) + '/'

			INSERT INTO [dbo].ProjectsFiles	([name],[file_stream], [is_directory], [path_locator])
			OUTPUT Inserted.path_locator
			SELECT @name, @fileStream, @isFolder, @new_path
		END

	ELSE
		BEGIN
			INSERT INTO [dbo].ProjectsFiles	([name],[file_stream], [is_directory])
			OUTPUT Inserted.path_locator
			SELECT @name, @fileStream, @isFolder
		END
RETURN 0
