using System;
using LinqToDB.Mapping;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Tests")]
    public class Test : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]
        public Guid TaskId { get; set; }

        [Column(Name = "InputFile"), NotNull]
        public SqlHierarchyId InputFileId { get; set; }

        [Column(Name = "OutputFile"), NotNull]
        public SqlHierarchyId OutputFileId { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }

        [Association(ThisKey = "InputFileId", OtherKey = "Id")]
        public File InputFile { get; set; }

        [Association(ThisKey = "OutputFileId", OtherKey = "Id")]
        public File OutputFile { get; set; }
    }
}
