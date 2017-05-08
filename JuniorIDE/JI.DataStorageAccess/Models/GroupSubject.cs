using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "GroupSubjects")]
    public class GroupSubject 
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "GroupId")]
        public Guid GroupId { get; set; }

        [Column(Name = "SubjectId")]
        public Guid SubjectId { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id")]
        public Subject Subject { get; set; }

        [Association(ThisKey = "Id", OtherKey = "GroupSubjectId")]
        public IList<TaskDeadline> Deadlines { get; set; }
    }
}