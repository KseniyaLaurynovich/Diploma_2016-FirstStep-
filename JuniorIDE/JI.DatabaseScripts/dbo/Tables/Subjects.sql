CREATE TABLE [dbo].[Subjects] (
    [Id]           UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [Name]         NVARCHAR (100)		NOT NULL,
    [UserId]	   UNIQUEIDENTIFIER		NULL,
	CONSTRAINT [Subject_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE SET NULL
);

