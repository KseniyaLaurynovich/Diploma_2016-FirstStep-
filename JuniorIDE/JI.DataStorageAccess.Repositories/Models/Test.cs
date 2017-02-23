using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "Tests")]
    public class Test : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]
        public Guid TaskId { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "InputArguments"), Nullable]
        public string InputArguments { get; set; }

        [Column(Name = "OutputArguments"), Nullable]
        public string OutputArguments { get; set; }

        [Column(Name = "InputFile"), Nullable]
        public byte[] InputFile { get; set; }

        [Column(Name = "OutputFile"), Nullable]
        public byte[] OutputFile { get; set; }

        [Column(Name = "Weight"), NotNull]
        public int Weight { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
