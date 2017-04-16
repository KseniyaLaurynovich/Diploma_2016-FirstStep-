using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "TryingsHistory")]
    public class TryingHistory : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "ProjectId"), NotNull]
        public Guid ProjectId { get; set; }

        [Column(Name = "Date"), NotNull]
        public DateTime DateTime { get; set; }

        [Column(Name = "Compiled"), NotNull]
        public bool Compiled { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TryingHistoryId")]
        public ICollection<Trying> Items { get; set; }
    }
}
