CREATE TABLE [dbo].[Comment] (
    [Id]          UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Text]        NVARCHAR (MAX)			  NOT NULL,
    [User_Id]    UNIQUEIDENTIFIER            NOT NULL,
    [Project_Id] UNIQUEIDENTIFIER            NOT NULL,
	[DateTime]	  DATETIME					  NOT NULL,
    CONSTRAINT [Comment_Project] FOREIGN KEY ([Project_Id]) REFERENCES [dbo].[Project] ([Id])
);

