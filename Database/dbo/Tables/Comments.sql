CREATE TABLE [dbo].[Comments] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Text]        NVARCHAR (MAX) NOT NULL,
    [Users_Id]    INT            NOT NULL,
    [Projects_Id] INT            NOT NULL,
    CONSTRAINT [Comments_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Comments_Projects] FOREIGN KEY ([Projects_Id]) REFERENCES [dbo].[Projects] ([Id]),
    CONSTRAINT [Comments_Users] FOREIGN KEY ([Users_Id]) REFERENCES [dbo].[Users] ([Id])
);

