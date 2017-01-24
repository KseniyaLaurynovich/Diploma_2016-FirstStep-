using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name="UserRoles")]
    public class UserRole : IWithIdentifier
    {
        [Column(Name="Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name="UserId"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "RoleId"), NotNull]
        public string RoleId { get; set; }

        [Association(ThisKey = "UserId", OtherKey = "Id")]
        public User User { get; set; }

        [Association(ThisKey = "RoleId", OtherKey = "Id")]
        public Role Role { get; set; }
    }
}
