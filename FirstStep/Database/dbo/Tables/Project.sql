CREATE TABLE [dbo].[Project] (
    [Id]               UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Task_Id]         UNIQUEIDENTIFIER         NOT NULL,
    [ProjectFolder]    UNIQUEIDENTIFIER			NOT NULL,
    [CreationDate]     DATETIME					NOT NULL,
    [ModificationDate] DATETIME					NOT NULL,
    [Closed]           BIT						DEFAULT ((0)) NOT NULL,
    [Mark]             INT						NULL,
    [User_Id]         UNIQUEIDENTIFIER						NOT NULL,
    [FolderName] VARBINARY(100) NULL, 
    CONSTRAINT [Project_Task] FOREIGN KEY ([Task_Id]) REFERENCES [dbo].[Task] ([Id]),
    CONSTRAINT [Project_User] FOREIGN KEY ([User_Id]) REFERENCES [dbo].[User] ([Id])
);

