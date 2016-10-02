CREATE TABLE [dbo].[UsersSubjects] (
    [Subject_Id] INT NOT NULL,
    [Users_Id]   INT NOT NULL,
    CONSTRAINT [UsersSubjects_pk] PRIMARY KEY CLUSTERED ([Subject_Id] ASC, [Users_Id] ASC),
    CONSTRAINT [UsersSubjects_Subject] FOREIGN KEY ([Subject_Id]) REFERENCES [dbo].[Subjects] ([Id]),
    CONSTRAINT [UsersSubjects_Users] FOREIGN KEY ([Users_Id]) REFERENCES [dbo].[Users] ([Id])
);

