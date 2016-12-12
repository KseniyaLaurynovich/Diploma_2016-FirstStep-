using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;
using System.Collections.Generic;

namespace FirstStep_Storage.Models
{
    [Table(Name = "TryingsHistory")]
    public class TryingHistory : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "ProjectId"), NotNull]
        public string ProjectId { get; set; }

        [Column(Name = "DateTime"), NotNull]
        public DateTime DateTime { get; set; }

        [Column(Name = "Compiled"), NotNull]
        public bool Compiled { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TryingHistoryId")]
        public ICollection<TryingHistory> Items { get; set; }
    }
}
