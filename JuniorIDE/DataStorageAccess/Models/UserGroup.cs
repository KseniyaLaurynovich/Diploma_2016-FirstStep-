using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "UserGroups")]
    public class UserGroup : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "UserId"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "GroupId"), NotNull]
        public string GroupId { get; set; }
    }
}
