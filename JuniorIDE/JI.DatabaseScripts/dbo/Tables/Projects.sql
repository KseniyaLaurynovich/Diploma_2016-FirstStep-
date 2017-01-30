CREATE TABLE [dbo].[Projects] (
    [Id]				UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [TaskId]			UNIQUEIDENTIFIER        NULL,
    [ProjectFolderId]	HIERARCHYID				NOT NULL,
    [CreationDate]		DATETIME				NOT NULL,
    [ModificationDate]	DATETIME				NOT NULL,
    [Closed]			BIT						DEFAULT ((0)) NOT NULL,
    [Mark]				INT						NULL,
    [UserId]			UNIQUEIDENTIFIER		NULL,
    [FolderName]		VARBINARY(100)			NULL, 
    CONSTRAINT [Project_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]) ON DELETE SET NULL,
	CONSTRAINT [Project_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE SET NULL,
	CONSTRAINT [Project_Folder] FOREIGN KEY ([ProjectFolderId]) REFERENCES [dbo].[ProjectsFiles] (path_locator) ON DELETE CASCADE
);

