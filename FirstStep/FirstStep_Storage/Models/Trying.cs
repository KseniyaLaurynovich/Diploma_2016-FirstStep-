using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Trying")]
    public class Trying : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "TryingHistory_Id"), NotNull]
        public string TryingHistoryId { get; set; }

        [Column(Name = "Test_Id"), NotNull]
        public string TestId { get; set; }

        [Column(Name = "Pass"), NotNull]
        public bool Pass { get; set; }
    }
}
