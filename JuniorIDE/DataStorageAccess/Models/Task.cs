﻿using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Repositories.Models
{
    [Table(Name = "Tasks")]
    public class Task : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

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
