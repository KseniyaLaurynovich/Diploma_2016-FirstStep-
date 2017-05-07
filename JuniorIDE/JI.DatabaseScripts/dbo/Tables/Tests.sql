CREATE TABLE [dbo].[Tests] (
    [Id]				UNIQUEIDENTIFIER		  DEFAULT NEWID() PRIMARY KEY,
    [TaskId]			UNIQUEIDENTIFIER          NOT NULL,
    [InputFile]			HIERARCHYID				  NOT NULL,
    [OutputFile]		HIERARCHYID		          NOT NULL,
    CONSTRAINT [Test_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [Task_Input] FOREIGN KEY ([InputFile]) REFERENCES [dbo].[ProjectsFiles] ([path_locator]) ON DELETE SET NULL,
	CONSTRAINT [Task_Output] FOREIGN KEY ([OutputFile]) REFERENCES [dbo].[ProjectsFiles] ([path_locator]) ON DELETE SET NULL
);

