﻿CREATE TABLE [dbo].[Subject] (
    [Id]           UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    [Name]         NVARCHAR (100) NOT NULL,
    [User_Id]	   UNIQUEIDENTIFIER NOT NULL
);
