CREATE TABLE [dbo].[Tests] (
    [Id]				UNIQUEIDENTIFIER		  DEFAULT NEWID() PRIMARY KEY,
    [TaskId]			UNIQUEIDENTIFIER          NOT NULL,
    [Name]				NVARCHAR (100)			  NOT NULL,
    [InputArguments]	NVARCHAR (MAX)			  NULL,
    [OutputArguments]	NVARCHAR (MAX)			  NULL,
    [InputFile]			HIERARCHYID				  NULL,
    [OutputFile]		HIERARCHYID		          NULL,
    [Weight]			INT						  NOT NULL,
    CONSTRAINT [Test_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id]) ON DELETE CASCADE
);

