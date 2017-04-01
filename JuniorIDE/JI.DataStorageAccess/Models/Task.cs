using System;
using System.Collections.Generic;
using LinqToDB.Common;
using LinqToDB.Mapping;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Tasks")]
    public class Task : IWithIdentifier
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "Description"), Nullable]
        public string Description { get; set; }

        [Column(Name = "SubjectId"), NotNull]
        public Guid SubjectId { get; set; }

        [Column(Name = "CreationDate"), NotNull]
        public DateTime CreationDate { get; set; }

        [Column(Name = "LastModified"), NotNull]
        public DateTime LastModified { get; set; }

        [Column(Name = "AutoTested")]
        public bool AutoTested { get; set; }

        [Column(Name = "IsVisible")]
        public bool IsVisible { get; set; }

        [Column(Name = "IsShared")]
        public bool IsShared { get; set; }

        [Column(Name = "TaskFolder")]
        public SqlHierarchyId TaskFolder { get; set; }

        [Column(Name = "TempFolder")]
        public SqlHierarchyId TempFolder { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TaskId")]
        public ICollection<Test> Tests { get; set; }

        [Association(ThisKey = "SubjectId", OtherKey = "Id")]
        public Subject Subject { get; set; }

        [Association(ThisKey = "Id", OtherKey = "TaskId")]
        public IList<TaskDeadline> Deadlines { get; set; }
    }
}
