using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "Groups")]
    public class Group : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }
    }
}
