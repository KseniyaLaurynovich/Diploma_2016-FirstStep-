CREATE TABLE [dbo].[Tasks] (
    [Id]             UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [Name]           NVARCHAR (100)			NOT NULL,
    [Description]    NVARCHAR (MAX)			NOT NULL,
    [SubjectId]      UNIQUEIDENTIFIER		NULL,
    [AdditionalInfo] NVARCHAR (MAX)			NULL,
    [CreationDate]   DATETIME			    NOT NULL, 
    [LastModified]	 DATETIME				NOT NULL, 
    CONSTRAINT [Task_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id]) ON DELETE SET NULL
);

