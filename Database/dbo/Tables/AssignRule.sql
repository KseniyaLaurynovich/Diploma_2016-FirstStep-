CREATE TABLE [dbo].[AssignRule] (
    [Id]        UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Task_Id]  UNIQUEIDENTIFIER      NOT NULL,
    [Deadline]  DATETIME			  NOT NULL,
    [Group_Id] UNIQUEIDENTIFIER	  NOT NULL,
    CONSTRAINT [AssignRule_Group] FOREIGN KEY ([Group_Id]) REFERENCES [dbo].[Group] ([Id]),
    CONSTRAINT [AssignRule_Task] FOREIGN KEY ([Task_Id]) REFERENCES [dbo].[Task] ([Id])
);

