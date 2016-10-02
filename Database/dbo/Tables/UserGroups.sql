CREATE TABLE [dbo].[UserGroups] (
    [Id]        INT IDENTITY (1, 1) NOT NULL,
    [Users_Id]  INT NOT NULL,
    [Groups_Id] INT NOT NULL,
    CONSTRAINT [UserGroups_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UserGroups_Groups] FOREIGN KEY ([Groups_Id]) REFERENCES [dbo].[Groups] ([Id]),
    CONSTRAINT [UserGroups_Users] FOREIGN KEY ([Users_Id]) REFERENCES [dbo].[Users] ([Id])
);

