using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Subjects")]
    public class Subject : IWithIdentifier
    {
        public Subject()
        {
            Tasks = new List<Task>();
            SubjectGroups = new List<GroupSubject>();
        }

        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "UserId"), NotNull]
        public Guid UserId { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId")]
        public IList<Task> Tasks { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId")]
        public IList<GroupSubject> SubjectGroups { get; set; }
    }
}
