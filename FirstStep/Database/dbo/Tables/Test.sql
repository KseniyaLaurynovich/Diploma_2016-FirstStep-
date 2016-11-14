CREATE TABLE [dbo].[Test] (
    [Id]              UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Task_Id]        UNIQUEIDENTIFIER            NOT NULL,
    [Name]            NVARCHAR (100)			  NOT NULL,
    [InputArguments]  NVARCHAR (MAX)			  NULL,
    [OutputArguments] NVARCHAR (MAX)			  NULL,
    [InputFile]       UNIQUEIDENTIFIER            NULL,
    [OutputFile]      UNIQUEIDENTIFIER            NULL,
    [Weight]          INT						  NOT NULL,
    CONSTRAINT [Test_Task] FOREIGN KEY ([Task_Id]) REFERENCES [dbo].[Task] ([Id])
);

