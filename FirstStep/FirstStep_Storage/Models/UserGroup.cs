using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "UserGroups")]
    public class UserGroup : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "UserId"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "GroupId"), NotNull]
        public string GroupId { get; set; }
    }
}
