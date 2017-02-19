CREATE TABLE [dbo].[Users]
(
	[Id]					UNIQUEIDENTIFIER		DEFAULT NEWID() PRIMARY KEY,
	[Email]					[nvarchar](256)			NULL,
	[PasswordHash]			[nvarchar](max)			NULL,
	[UserName]				[nvarchar](256)			NOT NULL,
	[FirstName]				[nvarchar](50)			NOT NULL,
	[LastName]				[nvarchar](100)			NOT NULL,
	[Patronymic]			[nvarchar](100)			NOT NULL,
	[IsEmailConfirmed]		[bit]					NOT NULL	DEFAULT(0) , 
    [SecurityStamp]			NVARCHAR(MAX)			NULL, 
    [RegistrationDate]		DATETIME				NOT NULL	DEFAULT GETDATE(), 
    [IsActivated] BIT NOT NULL DEFAULT (0)
)
