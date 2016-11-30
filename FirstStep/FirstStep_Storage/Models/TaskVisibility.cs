using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    public class TaskVisibility
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Task_Id"), NotNull]
        public string TaskId { get; set; }

        [Column(Name = "Group_Id"), NotNull]
        public string GroupId { get; set; }

        [Column(Name = "IsVisible"), NotNull]
        public bool IsVisible { get; set; }
    }
}
