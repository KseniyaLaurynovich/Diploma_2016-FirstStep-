using System;
using LinqToDB.Mapping;
using Microsoft.SqlServer.Types;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "ProjectsFiles")]
    public class File 
    {
        [Column(Name = "path_locator", SkipOnInsert = true)]
        public SqlHierarchyId Id { get; set; }

        [Column(Name = "parent_path_locator", SkipOnInsert = true, SkipOnUpdate = true)]
        public SqlHierarchyId ParentId { get; set; }

        [Column(Name = "name")]
        public string Name { get; set; }

        [Column(Name = "file_stream")]
        public byte[] Data { get; set; }

        [Column(Name = "is_directory", SkipOnInsert = true, SkipOnUpdate = true)]
        public bool IsFolder { get; set; }
    }
}
