using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name="Role")]
    public class Role : IWithIdentifier
    {
        [Column(Name="Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name="Name"), NotNull]
        public string Name { get; set; }
    }
}
