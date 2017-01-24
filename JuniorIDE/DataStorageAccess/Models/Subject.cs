using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Subjects")]
    public class Subject : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "UserId"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId")]
        public ICollection<Task> Tasks { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId")]
        public ICollection<SubjectGroup> SubjectGroups { get; set; }
    }
}
