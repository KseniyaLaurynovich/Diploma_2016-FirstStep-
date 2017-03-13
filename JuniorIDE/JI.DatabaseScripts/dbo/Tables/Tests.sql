CREATE TABLE [dbo].[Tests] (
    [Id]				UNIQUEIDENTIFIER		  DEFAULT NEWID() PRIMARY KEY,
    [TaskId]			UNIQUEIDENTIFIER          NOT NULL,
    [InputFile]			HIERARCHYID				  NULL,
    [OutputFile]		HIERARCHYID		          NULL,
    CONSTRAINT [Test_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]) ON DELETE CASCADE
);

