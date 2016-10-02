CREATE TABLE [dbo].[TryingHistory] (
    [Id]          INT      IDENTITY (1, 1) NOT NULL,
    [Projects_Id] INT      NOT NULL,
    [Date]        DATETIME NOT NULL,
    [Compiled]    BIT      DEFAULT ((0)) NOT NULL,
    [Pass]        BIT      NOT NULL,
    CONSTRAINT [TryingHistory_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [TryingHistory_Projects] FOREIGN KEY ([Projects_Id]) REFERENCES [dbo].[Projects] ([Id])
);

