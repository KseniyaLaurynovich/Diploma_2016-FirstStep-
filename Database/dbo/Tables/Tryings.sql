CREATE TABLE [dbo].[Tryings] (
    [Id]               INT IDENTITY (1, 1) NOT NULL,
    [TryingHistory_Id] INT NOT NULL,
    [Tests_Id]         INT NOT NULL,
    [Pass]             BIT DEFAULT ((0)) NOT NULL,
    CONSTRAINT [Tryings_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Tryings_Tests] FOREIGN KEY ([Tests_Id]) REFERENCES [dbo].[Tests] ([Id]),
    CONSTRAINT [Tryings_TryingHistory] FOREIGN KEY ([TryingHistory_Id]) REFERENCES [dbo].[TryingHistory] ([Id])
);

