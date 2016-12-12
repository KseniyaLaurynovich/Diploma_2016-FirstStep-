CREATE TABLE [dbo].[GroupSubjects] (
	[Id]			[nvarchar](128) DEFAULT NEWID() PRIMARY KEY,
    [GroupId]		[nvarchar](128) NOT NULL,
    [SubjectId]		[nvarchar](128) NOT NULL,
    CONSTRAINT [GroupSubject_Group] FOREIGN KEY ([GroupId]) REFERENCES [dbo].[Groups] ([Id]),
	CONSTRAINT [GroupSubject_Subject] FOREIGN KEY ([SubjectId]) REFERENCES [dbo].[Subjects] ([Id])
);

