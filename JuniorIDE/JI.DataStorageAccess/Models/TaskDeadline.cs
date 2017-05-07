using LinqToDB.Mapping;
using System;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "TaskDeadlines")]
    public class TaskDeadline : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "TaskId"), NotNull]  
        public Guid TaskId { get; set; }

        [Column(Name = "GroupSubjectId"), NotNull]
        public Guid GroupSubjectId { get; set; }

        [Column(Name = "Deadline"), Nullable]
        public DateTime? Deadline { get; set; }

        [Association(ThisKey = "GroupSubjectId", OtherKey = "Id")]
        public GroupSubject GroupSubject { get; set; }
    }
}
