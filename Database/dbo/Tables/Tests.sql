CREATE TABLE [dbo].[Tests] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [Tasks_Id]        INT            NOT NULL,
    [Type]            NVARCHAR (10)  NOT NULL,
    [InputArguments]  NVARCHAR (MAX) NULL,
    [OutputArguments] NVARCHAR (MAX) NULL,
    [InputFile]       INT            NULL,
    [OutputFile]      INT            NULL,
    [Weight]          INT            NOT NULL,
    CONSTRAINT [Tests_pk] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Tests_Tasks] FOREIGN KEY ([Tasks_Id]) REFERENCES [dbo].[Tasks] ([Id])
);

