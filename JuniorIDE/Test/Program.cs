//using System;
//using System.Configuration;
//using CmdWrapper;

//namespace Test
//{
//    class Program
//    {

//        static void Main(string[] args)
//        {
//            var userId = "70cb531d-130b-408a-83c5-d72fe712cc46";
//            var taskId = "b61fbd43-395c-478a-addb-f0243ff20a41";

//            var projectStream = System.IO.File.OpenRead("D:/1.zip");//Request.Content.ReadAsStreamAsync().Result;
//            var result = _projectManager.CreateProjectByStream(projectStream, userId, taskId);

//            if (result.Succeeded)
//            {
//                var testResult = _testManager.Test(userId, taskId);
//            }

//            //var compilerPath = ConfigurationManager.AppSettings["cpp:compiler"];

//            //var runner = new Cmd();
//            //var arguments = CppCompilerHelper.GetArgumentsString("Argv.exe", new[] { "Argv.cpp" });
//            //var result = runner.Run("D:/", arguments, compilerPath + "/g++.exe");

//            //Console.WriteLine(result.Status);
//            //Console.WriteLine(string.Join("/n", result.Errors ?? new string[0]));

//            //var result = runner.Run("D:/", "dfasdfasdf", "D:/Argv.exe");
//            //Console.WriteLine(result.Status);
//            //Console.WriteLine(string.Join("/n", result.Output));
//        }
//    }
//}
