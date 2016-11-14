using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;
using System.Collections.Generic;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Task")]
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

        [Column(Name = "Subject_Id"), NotNull]
        public string SubjectId { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }
    }
}
