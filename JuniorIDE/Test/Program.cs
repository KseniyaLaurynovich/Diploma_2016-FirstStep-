//using System;
//using System.Configuration;
//using CmdWrapper;
//using CppCompiler.Configuration;
//using CppCompiler.Helpers;

//namespace Test
//{
//    class Program
//    {
//        static void Main(string[] args)
//        {
//            var compilerPath = ConfigurationManager.AppSettings["cpp:compiler"];

//            var runner = new Cmd();
//            var arguments = CppCompilerHelper.GetArgumentsString("Argv.exe", new[] { "Argv.cpp" });
//            var result = runner.Run("D:/", arguments, compilerPath + "/g++.exe");

//            Console.WriteLine(result.Status);
//            Console.WriteLine(string.Join("/n", result.Errors ?? new string[0]));

//            //var result = runner.Run("D:/", "dfasdfasdf", "D:/Argv.exe");
//            //Console.WriteLine(result.Status);
//            //Console.WriteLine(string.Join("/n", result.Output));
//        }
//    }
//}
