using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "User")]
    public class User : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }
    }
}
