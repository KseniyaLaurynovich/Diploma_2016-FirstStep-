CREATE TABLE [dbo].[Tasks] (
    [Id]             UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
    [Name]           NVARCHAR (100)			NOT NULL,
    [Description]    NVARCHAR (MAX)			NULL,
    [SubjectId]      UNIQUEIDENTIFIER		NOT NULL,
    [CreationDate]   DATETIME			    NOT NULL, 
    [LastModified]	 DATETIME				NOT NULL, 
	[AutoTested]	 BIT					NOT NULL DEFAULT(0),
	[IsVisible]		 BIT					NOT NULL DEFAULT(0),
	[IsShared]		 BIT					NOT NULL DEFAULT(0),
	[TaskFolder]     hierarchyid			NULL,
	[TempFolder]	 hierarchyid			NULL,
    CONSTRAINT [Task_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [Task_Folder] FOREIGN KEY ([TaskFolder]) REFERENCES [dbo].[ProjectsFiles] ([path_locator]) ON DELETE SET NULL,
	CONSTRAINT [Task_Temp] FOREIGN KEY ([TaskFolder]) REFERENCES [dbo].[ProjectsFiles] ([path_locator]) ON DELETE SET NULL
);

