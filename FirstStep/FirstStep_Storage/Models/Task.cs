using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;
using System.Collections.Generic;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Tasks")]
    public class Task : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public int Id { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "Description"), NotNull]
        public string Description { get; set; }

        [Column(Name = "AdditionalInfo"), Nullable]
        public string AdditionalInfo { get; set; }

        [Column(Name = "Subject_Id"), NotNull]
        public int SubjectId { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id")]
        public Subject Subject { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TaskId")]
        public ICollection<Test> Tests { get; set; }
    }
}
