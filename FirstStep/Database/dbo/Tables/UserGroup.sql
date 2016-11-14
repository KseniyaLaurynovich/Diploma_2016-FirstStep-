CREATE TABLE [dbo].[UserGroup] (
    [Id]        UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [User_Id]  UNIQUEIDENTIFIER NOT NULL,
    [Group_Id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [UserGroup_Group] FOREIGN KEY ([Group_Id]) REFERENCES [dbo].[Group] ([Id]),
    CONSTRAINT [UserGroup_User] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User] ([Id])
);

