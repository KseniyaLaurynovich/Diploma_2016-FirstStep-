CREATE TABLE [dbo].[Tryings] (
    [Id]                UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [TryingHistoryId]	UNIQUEIDENTIFIER		NOT NULL,
    [TestId]			UNIQUEIDENTIFIER		NOT NULL,
    [Pass]				BIT						DEFAULT ((0)) NOT NULL,
    [Errors] NVARCHAR(MAX) NULL, 
    CONSTRAINT [Trying_Test] FOREIGN KEY ([TestId]) REFERENCES [dbo].[Tests] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [Trying_TryingHistory] FOREIGN KEY ([TryingHistoryId]) REFERENCES [dbo].[TryingsHistory] ([Id]) ON DELETE CASCADE
);

