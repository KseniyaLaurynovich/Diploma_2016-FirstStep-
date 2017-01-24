CREATE TABLE [dbo].[Comments] (
    [Id]			UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [Text]			[nvarchar] (MAX)		NOT NULL,
    [UserId]		UNIQUEIDENTIFIER        NOT NULL,
    [ProjectId]		UNIQUEIDENTIFIER        NOT NULL,
	[DateTime]		DATETIME				NOT NULL,
    CONSTRAINT [Comment_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Projects] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [Comment_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);

