using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "UserSubject")]
    public class UserSubject : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Subject_Id"), NotNull]
        public string SubjectId { get; set; }

        [Column(Name = "User_Id"), NotNull]
        public string UserId { get; set; }
    }
}
