CREATE TABLE [dbo].[TryingsHistory] (
    [Id]            [nvarchar](128)		DEFAULT NEWID() PRIMARY KEY,
    [ProjectId]		[nvarchar](128)     NOT NULL,
    [Date]			DATETIME			NOT NULL,
    [Compiled]		BIT					DEFAULT((0)) NOT NULL,
    CONSTRAINT [TryingHistory_Project] FOREIGN KEY ([ProjectId]) REFERENCES [dbo].[Projects] ([Id])
);

