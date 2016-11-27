namespace BusinesServices.Models
{
    public class Test
    {
        public string Id { get; set; }

        public int TaskId { get; set; }

        public string Name { get; set; }

        public string InputArguments { get; set; }

        public string OutputArguments { get; set; }

        public byte[] InputFile { get; set; }

        public byte[] OutputFile { get; set; }

        public int Weight { get; set; }
    }
}