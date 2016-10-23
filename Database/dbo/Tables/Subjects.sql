CREATE TABLE [dbo].[Subjects] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [CreationDate] DATETIME       NOT NULL,
    [Name]         NVARCHAR (100) NOT NULL,
    [Description]  NVARCHAR (MAX) NULL,
    [User_Id] INT NULL, 
    CONSTRAINT [Subject_pk] PRIMARY KEY CLUSTERED ([Id] ASC)
);

