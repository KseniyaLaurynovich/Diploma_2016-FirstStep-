﻿using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Project")]
    public class Project : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Task_Id"), NotNull]
        public string TaskId { get; set; }

        [Column(Name = "User_Id"), NotNull]
        public string UserId { get; set; }

        [Column(Name = "ProjectFolder"), NotNull]
        public string ProjectFolder { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Column(Name = "ModificationDate"), NotNull]
        public DateTime ModificationDate { get; set; }

        [Column(Name = "Closed"), NotNull]
        public bool Closed { get; set; }

        [Column(Name = "Mark"), Nullable]
        public int? Mark { get; set; }
    }
}