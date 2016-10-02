CREATE TABLE [dbo].[Tasks] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
    [Name]           NVARCHAR (100) NOT NULL,
    [Description]    NVARCHAR (MAX) NOT NULL,
    [Subject_Id]     INT            NOT NULL,
    [AdditionalInfo] NVARCHAR (MAX) NULL,
    [CreationDate] DATETIME NOT NULL, 
    CONSTRAINT [Tasks_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Tasks_Subject] FOREIGN KEY ([Subject_Id]) REFERENCES [dbo].[Subjects] ([Id])
);

