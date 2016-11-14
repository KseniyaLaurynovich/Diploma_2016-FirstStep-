using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;

namespace FirstStep_Storage.Models
{
    [Table(Name = "TryingHistory")]
    public class TryingHistory : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Project_Id"), NotNull]
        public string ProjectId { get; set; }

        [Column(Name = "DateTime"), NotNull]
        public DateTime DateTime { get; set; }

        [Column(Name = "Compiled"), NotNull]
        public bool Compiled { get; set; }
    }
}
