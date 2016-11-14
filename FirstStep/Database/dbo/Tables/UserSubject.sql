CREATE TABLE [dbo].[UserSubject] (
	[Id] UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Subject_Id] UNIQUEIDENTIFIER NOT NULL,
    [User_Id]   UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [UserSubject_Subject] FOREIGN KEY ([Subject_Id]) REFERENCES [dbo].[Subject] ([Id]),
    CONSTRAINT [UserSubject_User] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User] ([Id])
);

