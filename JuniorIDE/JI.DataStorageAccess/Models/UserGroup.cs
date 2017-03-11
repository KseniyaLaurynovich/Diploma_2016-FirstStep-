using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "UserGroups")]
    public class UserGroup 
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "UserId"), NotNull]
        public Guid UserId { get; set; }

        [Column(Name = "GroupId"), NotNull]
        public Guid GroupId { get; set; }

        [Association(ThisKey = "UserId", OtherKey = "Id")]
        public User User { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }
    }
}
