CREATE TRIGGER [InsteadInsertSubjectTrigger]
ON [dbo].[Subjects]
INSTEAD OF INSERT
AS
	declare @subject_name nvarchar(100);
	declare @subject_id nvarchar(128);
	declare @subject_user_id nvarchar(128);

	declare @duplicated_name nvarchar(100);
	
	select @subject_name=d.Name from inserted d;
	select @subject_id = d.Id from inserted d;
	select @subject_user_id = d.UserId from inserted d;

	select @duplicated_name = count(*) from [dbo].[Subjects] s 
		where s.Name = @subject_name AND s.UserId = @subject_user_id

	BEGIN
		if(@duplicated_name>0)
		begin
			RAISERROR('Subject with the same name exists',16,1);
			ROLLBACK;
		end
		else
		begin
			insert into [dbo].[Subjects](Id,UserId,Name)
			values(@subject_id,@subject_user_id,@subject_name);
		end
	END;
GO
