using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "GroupSubject")]
    public class SubjectGroup : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Subject_Id"), NotNull]
        public string SubjectId { get; set; }

        [Column(Name = "Group_Id"), NotNull]
        public string GroupId { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id", CanBeNull = false)]
        public Subject Subject { get; set; }

        [Association(ThisKey = "GroupId", OtherKey = "Id", CanBeNull = false)]
        public Group Group { get; set; }
    }
}
