CREATE TABLE [dbo].[TryingsHistory] (
    [Id]            UNIQUEIDENTIFIER	DEFAULT NEWID() PRIMARY KEY,
    [ProjectId]		UNIQUEIDENTIFIER    NOT NULL,
    [Date]			DATETIME			NOT NULL,
    [Compiled]		BIT					DEFAULT(0) NOT NULL,
    CONSTRAINT [TryingHistory_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Projects] ([Id]) ON DELETE CASCADE
);

