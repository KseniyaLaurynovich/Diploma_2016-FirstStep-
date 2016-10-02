-- tables
-- Table: Comments
CREATE TABLE Comments (
    Id int  NOT NULL IDENTITY,
    Text nvarchar(max)  NOT NULL,
    Users_Id int  NOT NULL,
    Projects_Id int  NOT NULL,
    CONSTRAINT Comments_pk PRIMARY KEY  (Id)
);

-- Table: Groups
CREATE TABLE Groups (
    Id int  NOT NULL IDENTITY,
    CONSTRAINT Groups_pk PRIMARY KEY  (Id)
);

-- Table: Projects
CREATE TABLE Projects (
    Id int  NOT NULL IDENTITY,
    Tasks_Id int  NOT NULL,
    ProjectFolder nvarchar(255)  NOT NULL,
    CreationDate datetime  NOT NULL,
    ModificationDate datetime  NOT NULL,
    Closed bit  NOT NULL DEFAULT 0,
    Mark int  NOT NULL,
    Users_Id int  NOT NULL,
    CONSTRAINT Projects_pk PRIMARY KEY  (Id)
);

-- Table: Subject
CREATE TABLE [Subject] (
    Id int  NOT NULL IDENTITY,
    CreationDate datetime  NOT NULL,
    Name nvarchar(100)  NOT NULL,
    Description nvarchar(max)  NULL,
    CONSTRAINT Subject_pk PRIMARY KEY  (Id)
);

-- Table: Tasks
CREATE TABLE Tasks (
    Id int  NOT NULL IDENTITY,
    Name nvarchar(100)  NOT NULL,
    Description nvarchar(max)  NOT NULL,
    Subject_Id int  NOT NULL,
    AdditionalInfo nvarchar(max)  NULL,
    CONSTRAINT Tasks_pk PRIMARY KEY  (Id)
);

-- Table: TasksAssignRules
CREATE TABLE TasksAssignRules (
    Id int  NOT NULL IDENTITY,
    Tasks_Id int  NOT NULL,
    Deadline datetime  NOT NULL,
    Groups_Id int  NOT NULL,
    CONSTRAINT TasksAssignRules_pk PRIMARY KEY  (Id)
);

-- Table: Tests
CREATE TABLE Tests (
    Id int  NOT NULL IDENTITY,
    Tasks_Id int  NOT NULL,
    Type nvarchar(10)  NOT NULL,
    InputArguments nvarchar(max)  NULL,
    OutputArguments nvarchar(max)  NULL,
    InputFile int  NULL,
    OutputFile int  NULL,
    Weight int  NOT NULL,
    CONSTRAINT Tests_pk PRIMARY KEY  (Id)
);

-- Table: TryingHistory
CREATE TABLE TryingHistory (
    Id int  NOT NULL IDENTITY,
    Projects_Id int  NOT NULL,
    Date datetime  NOT NULL,
    Compiled bit  NOT NULL DEFAULT 0,
    Pass bit  NOT NULL,
    CONSTRAINT TryingHistory_pk PRIMARY KEY  (Id)
);

-- Table: Tryings
CREATE TABLE Tryings (
    Id int  NOT NULL IDENTITY,
    TryingHistory_Id int  NOT NULL,
    Tests_Id int  NOT NULL,
    Pass bit  NOT NULL DEFAULT 0,
    CONSTRAINT Tryings_pk PRIMARY KEY  (Id)
);

-- Table: UserGroups
CREATE TABLE UserGroups (
    Id int  NOT NULL IDENTITY,
    Users_Id int  NOT NULL,
    Groups_Id int  NOT NULL,
    CONSTRAINT UserGroups_pk PRIMARY KEY  (Id)
);

-- Table: Users
CREATE TABLE Users (
    Id int  NOT NULL IDENTITY,
    CONSTRAINT Users_pk PRIMARY KEY  (Id)
);

-- Table: UsersSubjects
CREATE TABLE UsersSubjects (
    Subject_Id int  NOT NULL,
    Users_Id int  NOT NULL,
    CONSTRAINT UsersSubjects_pk PRIMARY KEY  (Subject_Id,Users_Id)
);

-- Reference: Comments_Projects (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Projects
    FOREIGN KEY (Projects_Id)
    REFERENCES Projects (Id);

-- Reference: Comments_Users (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Users
    FOREIGN KEY (Users_Id)
    REFERENCES Users (Id);

-- Reference: Projects_Tasks (table: Projects)
ALTER TABLE Projects ADD CONSTRAINT Projects_Tasks
    FOREIGN KEY (Tasks_Id)
    REFERENCES Tasks (Id);

-- Reference: Projects_Users (table: Projects)
ALTER TABLE Projects ADD CONSTRAINT Projects_Users
    FOREIGN KEY (Users_Id)
    REFERENCES Users (Id);

-- Reference: TasksAssignRules_Groups (table: TasksAssignRules)
ALTER TABLE TasksAssignRules ADD CONSTRAINT TasksAssignRules_Groups
    FOREIGN KEY (Groups_Id)
    REFERENCES Groups (Id);

-- Reference: TasksAssignRules_Tasks (table: TasksAssignRules)
ALTER TABLE TasksAssignRules ADD CONSTRAINT TasksAssignRules_Tasks
    FOREIGN KEY (Tasks_Id)
    REFERENCES Tasks (Id);

-- Reference: Tasks_Subject (table: Tasks)
ALTER TABLE Tasks ADD CONSTRAINT Tasks_Subject
    FOREIGN KEY (Subject_Id)
    REFERENCES Subject (Id);

-- Reference: Tests_Tasks (table: Tests)
ALTER TABLE Tests ADD CONSTRAINT Tests_Tasks
    FOREIGN KEY (Tasks_Id)
    REFERENCES Tasks (Id);

-- Reference: TryingHistory_Projects (table: TryingHistory)
ALTER TABLE TryingHistory ADD CONSTRAINT TryingHistory_Projects
    FOREIGN KEY (Projects_Id)
    REFERENCES Projects (Id);

-- Reference: Tryings_Tests (table: Tryings)
ALTER TABLE Tryings ADD CONSTRAINT Tryings_Tests
    FOREIGN KEY (Tests_Id)
    REFERENCES Tests (Id);

-- Reference: Tryings_TryingHistory (table: Tryings)
ALTER TABLE Tryings ADD CONSTRAINT Tryings_TryingHistory
    FOREIGN KEY (TryingHistory_Id)
    REFERENCES TryingHistory (Id);

-- Reference: UserGroups_Groups (table: UserGroups)
ALTER TABLE UserGroups ADD CONSTRAINT UserGroups_Groups
    FOREIGN KEY (Groups_Id)
    REFERENCES Groups (Id);

-- Reference: UserGroups_Users (table: UserGroups)
ALTER TABLE UserGroups ADD CONSTRAINT UserGroups_Users
    FOREIGN KEY (Users_Id)
    REFERENCES Users (Id);

-- Reference: UsersSubjects_Subject (table: UsersSubjects)
ALTER TABLE UsersSubjects ADD CONSTRAINT UsersSubjects_Subject
    FOREIGN KEY (Subject_Id)
    REFERENCES Subject (Id);

-- Reference: UsersSubjects_Users (table: UsersSubjects)
ALTER TABLE UsersSubjects ADD CONSTRAINT UsersSubjects_Users
    FOREIGN KEY (Users_Id)
    REFERENCES Users (Id);

-- End of file.