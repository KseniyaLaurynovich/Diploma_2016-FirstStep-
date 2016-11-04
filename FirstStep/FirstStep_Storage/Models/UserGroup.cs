using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "UserGroup")]
    public class UserGroup : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "User_Id"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "Group_Id"), NotNull]
        public string GroupId { get; set; }
    }
}
