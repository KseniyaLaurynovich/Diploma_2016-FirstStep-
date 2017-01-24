using System;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Files")]
    public class File : IWithIdentifier
    {
        [Column(Name = "path_locator")]
        public Guid Id { get; set; }

        [Column(Name = "parent_path_locator", SkipOnInsert = true, SkipOnUpdate = true)]
        public string ParentId { get; set; }

        [Column(Name = "name")]
        public string Name { get; set; }

        [Column(Name = "file_stream")]
        public byte[] Data { get; set; }

        [Column(Name = "is_directory", SkipOnInsert = true, SkipOnUpdate = true)]
        public bool IsFolder { get; set; }

        [Column(Name = "Path", SkipOnInsert = true, SkipOnUpdate = true)]
        public string Path { get; set; }
    }
}
