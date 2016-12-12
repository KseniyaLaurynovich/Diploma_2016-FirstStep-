using System.Collections.Generic;
using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Tryings")]
    public class Trying : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "TryingHistoryId"), NotNull]
        public string TryingHistoryId { get; set; }

        [Column(Name = "TestId"), NotNull]
        public string TestId { get; set; }

        [Column(Name = "Pass"), NotNull]
        public bool Pass { get; set; }

        [Association(ThisKey = "TryingHistoryId", OtherKey = "Id")]
        public TryingHistory TryingHistory { get; set; }
    }
}
