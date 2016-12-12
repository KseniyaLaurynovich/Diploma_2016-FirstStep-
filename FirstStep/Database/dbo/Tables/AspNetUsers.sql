﻿CREATE TABLE [dbo].[AspNetUsers]
(
	[Id]					[nvarchar](128)			DEFAULT NEWID() PRIMARY KEY,
	[Email]					[nvarchar](256)			NULL,
	[EmailConfirmed]		[bit]					NOT NULL,
	[PasswordHash]			[nvarchar](max)			NULL,
	[SecurityStamp]			[nvarchar](max)			NULL,
	[PhoneNumber]			[nvarchar](max)			NULL,
	[PhoneNumberConfirmed]  [bit]					NOT NULL,
	[TwoFactorEnabled]		[bit]					NOT NULL,
	[LockoutEndDateUtc]		[datetime]				NULL,
	[LockoutEnabled]		[bit]					NOT NULL,
	[AccessFailedCount]		[int]					NOT NULL,
	[UserName]				[nvarchar](256)			NOT NULL
)
