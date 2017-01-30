using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "Tryings")]
    public class Trying : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

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
