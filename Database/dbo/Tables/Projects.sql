CREATE TABLE [dbo].[Projects] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [Tasks_Id]         INT            NOT NULL,
    [ProjectFolder]    NVARCHAR (255) NOT NULL,
    [CreationDate]     DATETIME       NOT NULL,
    [ModificationDate] DATETIME       NOT NULL,
    [Closed]           BIT            DEFAULT ((0)) NOT NULL,
    [Mark]             INT            NOT NULL,
    [Users_Id]         INT            NOT NULL,
    CONSTRAINT [Projects_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Projects_Tasks] FOREIGN KEY ([Tasks_Id]) REFERENCES [dbo].[Tasks] ([Id]),
    CONSTRAINT [Projects_Users] FOREIGN KEY ([Users_Id]) REFERENCES [dbo].[Users] ([Id])
);

