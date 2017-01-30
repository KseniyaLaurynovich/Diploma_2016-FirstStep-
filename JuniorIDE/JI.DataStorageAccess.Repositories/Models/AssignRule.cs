using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "AssignRules")]
    public class AssignRule : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]
        public string TaskId { get; set; }

        [Column(Name = "GroupId"), NotNull]
        public string GroupId { get; set; }

        [Column(Name = "Deadline"), NotNull]
        public DateTime Deadline { get; set; }

        [Column(Name = "IsVisible"), NotNull]
        public bool IsVisible { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
