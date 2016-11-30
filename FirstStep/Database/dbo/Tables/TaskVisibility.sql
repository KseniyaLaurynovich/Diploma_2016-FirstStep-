CREATE TABLE [dbo].[TaskVisibility]
(
	 [Id]	UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
	 [Task_Id] UNIQUEIDENTIFIER NOT NULL,
	 [Group_Id] UNIQUEIDENTIFIER NOT NULL,
	 [IsVisible] bit default 0,
	 CONSTRAINT [TaskVisibility_Task] FOREIGN KEY ([Task_Id]) REFERENCES [dbo].[Task] ([Id]),
	 CONSTRAINT [TaskVisibility_Group] FOREIGN KEY ([Group_Id]) REFERENCES [dbo].[Group] ([Id])
)
