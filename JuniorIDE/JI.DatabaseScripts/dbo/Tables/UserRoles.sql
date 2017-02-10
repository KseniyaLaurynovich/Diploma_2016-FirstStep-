﻿CREATE TABLE [dbo].[UserRoles]
(
	[Id]		UNIQUEIDENTIFIER	DEFAULT NEWID() PRIMARY KEY,
	[UserId]	UNIQUEIDENTIFIER	NOT NULL,
	[RoleId]	UNIQUEIDENTIFIER	NOT NULL,
	CONSTRAINT  [User_Role] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE,
	CONSTRAINT  [Role_User] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]) ON DELETE CASCADE
)

