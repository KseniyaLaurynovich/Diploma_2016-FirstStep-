﻿CREATE TABLE [dbo].[TaskDeadlines]
(
	[Id]				UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
	[TaskId]			UNIQUEIDENTIFIER		NOT NULL,
	[GroupSubjectId]	UNIQUEIDENTIFIER		NOT NULL,
	[Deadline]			DATETIME				NULL,
	CONSTRAINT [Deadline_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [Deadline_GroupSubject] FOREIGN KEY ([GroupSubjectId]) REFERENCES [dbo].[GroupSubjects] ([Id]) ON DELETE CASCADE
)
