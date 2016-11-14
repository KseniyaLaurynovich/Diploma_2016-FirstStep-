CREATE TABLE [dbo].[TryingHistory] (
    [Id]          UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Project_Id] UNIQUEIDENTIFIER      NOT NULL,
    [Date]        DATETIME				NOT NULL,
    [Compiled]    BIT      DEFAULT((0)) NOT NULL,
    CONSTRAINT [TryingHistory_Project] FOREIGN KEY ([Project_Id]) REFERENCES [dbo].[Project] ([Id])
);

