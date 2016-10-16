using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;
using System.Collections.Generic;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Subjects")]
    public class Subject : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public int Id { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "Description"), Nullable]
        public string Description { get; set; }

        [Association(ThisKey = "Id", OtherKey = "SubjectId")]
        public ICollection<Task> Tasks { get; set; }

        //todo add user id
    }
}
