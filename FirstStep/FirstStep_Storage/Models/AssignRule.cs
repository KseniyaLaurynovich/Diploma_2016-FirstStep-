using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;

namespace FirstStep_Storage.Models
{
    [Table(Name = "AssignRules")]
    public class AssignRule : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "TaskId")]
        public string TaskId { get; set; }

        [Column(Name = "GroupId")]
        public string GroupId { get; set; }

        [Column(Name = "Deadline")]
        public DateTime Deadline { get; set; }

        [Column(Name = "IsVisible"), NotNull]
        public bool IsVisible { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }

        [Association(ThisKey = "TaskId", OtherKey = "Id")]
        public Task Task { get; set; }
    }
}
