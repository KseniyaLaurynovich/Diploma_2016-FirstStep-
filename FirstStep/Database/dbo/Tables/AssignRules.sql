CREATE TABLE [dbo].[AssignRules] (
    [Id]        [nvarchar](128)		DEFAULT NEWID() PRIMARY KEY,
    [TaskId]	[nvarchar](128)     NOT NULL,
    [Deadline]  DATETIME			NOT NULL,
    [GroupId]	[nvarchar](128)	    NOT NULL,
	[IsVisible]	bit					default 0,
    CONSTRAINT [AssignRule_Group] FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups] ([Id]),
    CONSTRAINT [AssignRule_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id])
);

