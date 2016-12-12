CREATE TABLE [dbo].[AspNetUserRoles]
(
	[UserId]	[nvarchar](128)				DEFAULT NEWID() PRIMARY KEY,
	[RoleId]	[nvarchar](128)				NOT NULL,
	CONSTRAINT  [User_Role] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE,
	CONSTRAINT  [Role_User] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE
)


