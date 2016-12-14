using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table(Name = "Files")]
    public class File : IHasIdentity
    {
        [Column(Name = "path_locator")]
        public string Id { get; set; }

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
