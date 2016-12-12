CREATE TABLE [dbo].[Comments] (
    [Id]			[nvarchar](128)			DEFAULT NEWID() PRIMARY KEY,
    [Text]			[nvarchar] (MAX)		NOT NULL,
    [UserId]		[nvarchar](128)         NOT NULL,
    [ProjectId]		[nvarchar](128)         NOT NULL,
	[DateTime]		DATETIME				NOT NULL,
    CONSTRAINT [Comment_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Projects] ([Id]),
	CONSTRAINT [Comment_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

