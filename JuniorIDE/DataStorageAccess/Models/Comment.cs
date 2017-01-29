using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "Comments")]
    public class Comment : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "Text"), NotNull]
        public string Text { get; set; }

        [Column(Name = "UsesId"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "ProjectId"), NotNull]
        public string ProjectId { get; set; }

        [Column(Name = "DateTime"), NotNull]
        public DateTime DateTime { get; set; }

        [Association(ThisKey = "ProjectId", OtherKey = "Id")]
        public Project Project { get; set; }
    }
}
