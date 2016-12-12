CREATE TABLE [dbo].[Tasks] (
    [Id]             [nvarchar](128)		DEFAULT NEWID() PRIMARY KEY,
    [Name]           NVARCHAR (100)			NOT NULL,
    [Description]    NVARCHAR (MAX)			NOT NULL,
    [SubjectId]      [nvarchar](128)		NOT NULL,
    [AdditionalInfo] NVARCHAR (MAX)			NULL,
    [CreationDate]   DATETIME			    NOT NULL, 
    [LastModified] DATETIME NOT NULL, 
    CONSTRAINT [Task_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id])
);

