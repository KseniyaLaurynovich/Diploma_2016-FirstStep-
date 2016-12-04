using System.Collections.Generic;
using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Subject")]
    public class Subject : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "User_Id"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId", CanBeNull = true)]
        public ICollection<Task> Tasks { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId", CanBeNull = true)]
        public ICollection<SubjectGroup> SubjectGroups { get; set; }
    }
}
