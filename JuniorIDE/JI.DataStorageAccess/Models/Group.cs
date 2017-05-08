using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Groups")]
    public class Group : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Association(ThisKey = "Id", OtherKey = "GroupId")]
        public IList<UserGroup> UserGroups { get; set; }
    }
}
