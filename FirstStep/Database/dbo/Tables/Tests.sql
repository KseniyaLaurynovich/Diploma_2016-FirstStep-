CREATE TABLE [dbo].[Tests] (
    [Id]              [nvarchar](128)			  DEFAULT NEWID() PRIMARY KEY,
    [TaskId]          [nvarchar](128)             NOT NULL,
    [Name]            NVARCHAR (100)			  NOT NULL,
    [InputArguments]  NVARCHAR (MAX)			  NULL,
    [OutputArguments] NVARCHAR (MAX)			  NULL,
    [InputFile]       UNIQUEIDENTIFIER            NULL,
    [OutputFile]      UNIQUEIDENTIFIER            NULL,
    [Weight]          INT						  NOT NULL,
    CONSTRAINT [Test_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Tasks] ([Id])
);

