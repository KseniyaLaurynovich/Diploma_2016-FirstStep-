﻿using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Comments")]
    public class Comment : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

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
