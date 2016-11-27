using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "UserSubject")]
    public class UserTask : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Task_Id"), NotNull]
        public string TaskId { get; set; }

        [Column(Name = "Group_Id"), NotNull]
        public string GroupId { get; set; }
    }
}
