CREATE TABLE [dbo].[GroupSubject] (
	[Id] UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Group_Id] UNIQUEIDENTIFIER NOT NULL,
    [Subject_Id]   UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [GroupSubject_Group] FOREIGN KEY ([Group_Id]) REFERENCES [dbo].[Group] ([Id]),
	CONSTRAINT [GroupSubject_Subject] FOREIGN KEY ([Subject_Id]) REFERENCES [dbo].[Subject] ([Id])
);

