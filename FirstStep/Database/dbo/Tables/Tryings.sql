CREATE TABLE [dbo].[Tryings] (
    [Id]                [nvarchar](128)		DEFAULT NEWID() PRIMARY KEY,
    [TryingHistoryId]	[nvarchar](128)		NOT NULL,
    [TestId]			[nvarchar](128)		NOT NULL,
    [Pass]				BIT					DEFAULT ((0)) NOT NULL,
    CONSTRAINT [Trying_Test] FOREIGN KEY ([TestId]) REFERENCES [dbo].[Tests] ([Id]),
    CONSTRAINT [Trying_TryingHistory] FOREIGN KEY ([TryingHistoryId]) REFERENCES [dbo].[TryingsHistory] ([Id])
);

