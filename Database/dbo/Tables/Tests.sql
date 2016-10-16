CREATE TABLE [dbo].[Tests] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [Tasks_Id]        INT            NOT NULL,
    [Name]            NVARCHAR (100)  NOT NULL,
    [InputArguments]  NVARCHAR (MAX) NULL,
    [OutputArguments] NVARCHAR (MAX) NULL,
    [InputFile]       VARBINARY(MAX)            NULL,
    [OutputFile]      VARBINARY(MAX)            NULL,
    [Weight]          INT            NOT NULL,
    CONSTRAINT [Tests_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Tests_Tasks] FOREIGN KEY ([Tasks_Id]) REFERENCES [dbo].[Tasks] ([Id])
);

