CREATE TABLE [dbo].[UserGroups] (
    [Id]			[nvarchar](128) DEFAULT NEWID() PRIMARY KEY,
    [UserId]		[nvarchar](128) NOT NULL,
    [GroupId]		[nvarchar](128) NOT NULL,
    CONSTRAINT [UserGroup_Group] FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups] ([Id]),
	CONSTRAINT [UserGroup_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

