using FirstStep_Storage.Models.Contracts;
using LinqToDB.Mapping;

namespace FirstStep_Storage.Models
{
    [Table("Tests")]
    public class Test : IHasIdentity
    {
        [Column(Name = "Id"), PrimaryKey, Identity]
        public int Id { get; set; }

        [Column(Name = "Tasks_Id"), NotNull]
        public int TaskId { get; set; }

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
