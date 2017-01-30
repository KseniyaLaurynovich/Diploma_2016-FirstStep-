﻿using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name="UserRoles")]
    public class UserRole : IWithIdentifier
    {
        [Column(Name="Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name="UserId"), NotNull]
        public Guid UserId { get; set; }

        [Column(Name = "RoleId"), NotNull]
        public Guid RoleId { get; set; }

        [Association(ThisKey = "UserId", OtherKey = "Id")]
        public User User { get; set; }

        [Association(ThisKey = "RoleId", OtherKey = "Id")]
        public Role Role { get; set; }
    }
}
