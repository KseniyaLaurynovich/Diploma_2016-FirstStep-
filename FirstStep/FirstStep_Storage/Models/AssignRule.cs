using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;
using System;

namespace FirstStep_Storage.Models
{
    [Table(Name = "AssignRule")]
    public class AssignRule : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Task_Id"), PrimaryKey]
        public string TaskId { get; set; }

        [Column(Name = "Group_Id"), PrimaryKey]
        public string GroupId { get; set; }

        [Column(Name = "Deadline"), PrimaryKey]
        public DateTime Deadline { get; set; }
    }
}
