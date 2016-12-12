using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;
using System.Collections.Generic;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Tasks")]
    public class Task : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "Description"), NotNull]
        public string Description { get; set; }

        [Column(Name = "AdditionalInfo"), Nullable]
        public string AdditionalInfo { get; set; }

        [Column(Name = "SubjectId"), NotNull]
        public string SubjectId { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Column(Name = "LastModified"), NotNull]
        public DateTime LastModified { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TaskId")]
        public ICollection<Test> Tests { get; set; }
    }
}
