using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Identity.Models
{
    [Table(Name="Roles")]
    internal class Role
    {
        [Column(Name="Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name="Name"), NotNull]
        public string Name { get; set; }
    }
}
