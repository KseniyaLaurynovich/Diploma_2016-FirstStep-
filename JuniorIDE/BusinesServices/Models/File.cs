﻿namespace JI.Services.Models
{
    public class File
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public byte[] Data { get; set; }
        public bool IsDirectory { get; set; }
        public string ParentId { get; set; }
        public string Path { get; set; }
    }
}
