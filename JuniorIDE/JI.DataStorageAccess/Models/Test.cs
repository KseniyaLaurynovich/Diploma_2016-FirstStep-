using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Tests")]
    public class Test : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]
        public Guid TaskId { get; set; }

        [Column(Name = "InputFile"), Nullable]
        public Guid InputFile { get; set; }

        [Column(Name = "OutputFile"), Nullable]
        public Guid OutputFile { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
