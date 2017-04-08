using System;
using LinqToDB.Mapping;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Projects")]
    public class Project : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]
        public Guid TaskId { get; set; }

        [Column(Name = "UserId"), NotNull]
        public Guid UserId { get; set; }

        [Column(Name = "ProjectFolder")]
        public SqlHierarchyId ProjectFolder { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Column(Name = "ModificationDate"), NotNull]
        public DateTime ModificationDate { get; set; }

        [Column(Name = "Closed"), NotNull]
        public bool Closed { get; set; }

        [Column(Name = "Mark"), Nullable]
        public int? Mark { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
