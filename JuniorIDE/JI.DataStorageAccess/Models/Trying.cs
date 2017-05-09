using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Tryings")]
    public class Trying : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TryingHistoryId"), NotNull]
        public Guid TryingHistoryId { get; set; }

        [Column(Name = "TestId"), NotNull]
        public Guid TestId { get; set; }

        [Column(Name = "Pass"), NotNull]
        public bool Pass { get; set; }

        [Column(Name = "Errors"), Nullable]
        public string Errors { get; set; }

        [Association(ThisKey = "TryingHistoryId", OtherKey = "Id")]
        public TryingHistory TryingHistory { get; set; }

        [Association(ThisKey = "TestId", OtherKey = "Id")]
        public Test Test { get; set; }
    }
}
