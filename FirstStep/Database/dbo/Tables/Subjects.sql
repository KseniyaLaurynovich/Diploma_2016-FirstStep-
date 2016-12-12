CREATE TABLE [dbo].[Subjects] (
    [Id]           [nvarchar](128)	 DEFAULT NEWID() PRIMARY KEY,
    [Name]         NVARCHAR (100)	 NOT NULL,
    [UserId]	   [nvarchar](128)	 NOT NULL,
	CONSTRAINT [Subject_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

