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

        [Column(Name = "InputFile"), Nullable]
        public SqlHierarchyId InputFile { get; set; }

        [Column(Name = "OutputFile"), Nullable]
        public SqlHierarchyId OutputFile { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
