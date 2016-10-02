namespace Test_App
{
    class ProcessHelper
    {
        public static string CreateArgumentsForArgs(string[] args)
        {
            return $"{string.Join(" ", args)}";
        }
    }
}
