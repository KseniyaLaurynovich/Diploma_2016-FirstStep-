CREATE TABLE [dbo].[Users]
(
	[Id]					UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
	[Email]					[nvarchar](256)			NULL,
	[PasswordHash]			[nvarchar](max)			NULL,
	[UserName]				[nvarchar](256)			NOT NULL,
	[FirstName]				[nvarchar](50)			NOT NULL,
	[LastName]				[nvarchar](100)			NOT NULL,
	[Patronymic]			[nvarchar](100)			NOT NULL,
	[IsActive]				[bit]					DEFAULT(0) NOT NULL
)
