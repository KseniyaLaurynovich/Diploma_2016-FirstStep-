using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Subjects")]
    public class Subject : IWithIdentifier
    {
        public Subject() { }

        internal Subject(Subject subject)
        {
            Id = subject.Id;
            UserId = subject.UserId;
            Name = subject.Name;
            Tasks = subject.Tasks;
            SubjectGroups = subject.SubjectGroups;
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

        public IList<Group> Groups { get; set; }
    }
}
