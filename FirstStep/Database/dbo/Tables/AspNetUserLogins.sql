CREATE TABLE [dbo].[AspNetUserLogins]
(
	[LoginProvider] [nvarchar](128)				DEFAULT NEWID() PRIMARY KEY,
	[ProviderKey]	[nvarchar](128)				NOT NULL,
	[UserId]		[nvarchar](128)				NOT NULL,
	CONSTRAINT		[Login_User] FOREIGN KEY (UserId) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE

)
