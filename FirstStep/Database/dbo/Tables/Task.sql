CREATE TABLE [dbo].[Task] (
    [Id]             UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Name]           NVARCHAR (100)			NOT NULL,
    [Description]    NVARCHAR (MAX)			NOT NULL,
    [Subject_Id]     UNIQUEIDENTIFIER       NOT NULL,
    [AdditionalInfo] NVARCHAR (MAX)			NULL,
    [CreationDate]   DATETIME			    NOT NULL, 
    CONSTRAINT [Task_Subject] FOREIGN KEY ([Subject_Id]) REFERENCES [dbo].[Subject] ([Id])
);

