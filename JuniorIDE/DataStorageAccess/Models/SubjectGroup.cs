using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "GroupSubjects")]
    public class SubjectGroup : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "SubjectId"), NotNull]
        public string SubjectId { get; set; }

        [Column(Name = "GroupId"), NotNull]
        public string GroupId { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id")]
        public Subject Subject { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id")]
        public Group Group { get; set; }
    }
}
