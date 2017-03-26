using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "GroupSubjects")]
    public class GroupSubject 
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "GroupId"), PrimaryKey, Identity]
        public Guid GroupId { get; set; }

        [Column(Name = "SubjectId"), PrimaryKey, Identity]
        public Guid SubjectId { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id")]
        public Subject Subject { get; set; }
    }
}