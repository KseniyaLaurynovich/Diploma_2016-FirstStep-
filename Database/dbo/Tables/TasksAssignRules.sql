CREATE TABLE [dbo].[TasksAssignRules] (
    [Id]        INT      IDENTITY (1, 1) NOT NULL,
    [Tasks_Id]  INT      NOT NULL,
    [Deadline]  DATETIME NOT NULL,
    [Groups_Id] INT      NOT NULL,
    CONSTRAINT [TasksAssignRules_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [TasksAssignRules_Groups] FOREIGN KEY ([Groups_Id]) REFERENCES [dbo].[Groups] ([Id]),
    CONSTRAINT [TasksAssignRules_Tasks] FOREIGN KEY ([Tasks_Id]) REFERENCES [dbo].[Tasks] ([Id])
);

