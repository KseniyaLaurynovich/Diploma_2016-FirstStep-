CREATE TABLE [dbo].[Tasks] (
    [Id]             UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [Name]           NVARCHAR (100)			NOT NULL,
    [Description]    NVARCHAR (MAX)			NOT NULL,
    [SubjectId]      UNIQUEIDENTIFIER		NULL,
    [CreationDate]   DATETIME			    NOT NULL, 
    [LastModified]	 DATETIME				NOT NULL, 
	[AutoTested]	 BIT					NOT NULL DEFAULT(0),
    CONSTRAINT [Task_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id]) ON DELETE SET NULL
);

