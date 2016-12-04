using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table("Test")]
    public class Test : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey]
        public string Id { get; set; }

        [Column(Name = "Task_Id"), NotNull]
        public string TaskId { get; set; }

        [Column(Name = "Name"), NotNull]
        public string Name { get; set; }

        [Column(Name = "InputArguments"), Nullable]
        public string InputArguments { get; set; }

        [Column(Name = "OutputArguments"), Nullable]
        public string OutputArguments { get; set; }

        [Column(Name = "InputFile"), Nullable]
        public byte[] InputFile { get; set; }

        [Column(Name = "OutputFile"), Nullable]
        public byte[] OutputFile { get; set; }

        [Column(Name = "Weight"), NotNull]
        public int Weight { get; set; }
    }
}
