CREATE TABLE [dbo].[Projects] (
    [Id]				[nvarchar](128)			DEFAULT NEWID() PRIMARY KEY,
    [TaskId]			[nvarchar](128)         NOT NULL,
    [ProjectFolder]		[nvarchar](128)			NOT NULL,
    [CreationDate]		DATETIME				NOT NULL,
    [ModificationDate]	DATETIME				NOT NULL,
    [Closed]			BIT						DEFAULT ((0)) NOT NULL,
    [Mark]				INT						NULL,
    [UserId]			[nvarchar](128)			NOT NULL,
    [FolderName]		VARBINARY(100)			NULL, 
    CONSTRAINT [Project_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]),
	CONSTRAINT [Project_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

