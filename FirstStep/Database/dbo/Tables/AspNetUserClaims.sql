CREATE TABLE [dbo].[AspNetUserClaims]
(
	[Id]			[int] IDENTITY(1,1)			PRIMARY KEY,
	[UserId]		[nvarchar](128)				NOT NULL,
	[ClaimType]		[nvarchar](max)				NULL,
	[ClaimValue]	[nvarchar](max)				NULL,
	CONSTRAINT		[Claim_User] FOREIGN KEY (UserId) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
)
