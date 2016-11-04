CREATE TABLE [dbo].[Trying] (
    [Id]               UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [TryingHistory_Id] UNIQUEIDENTIFIER NOT NULL,
    [Test_Id]         UNIQUEIDENTIFIER NOT NULL,
    [Pass]             BIT DEFAULT ((0)) NOT NULL,
    CONSTRAINT [Trying_Test] FOREIGN KEY ([Test_Id]) REFERENCES [dbo].[Test] ([Id]),
    CONSTRAINT [Trying_TryingHistory] FOREIGN KEY ([TryingHistory_Id]) REFERENCES [dbo].[TryingHistory] ([Id])
);

