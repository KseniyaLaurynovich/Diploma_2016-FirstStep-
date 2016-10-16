using CmdWrapper;
using FirstStep_Storage.Models;
using FirstStep_Storage.Repositories;
using System;
using System.Configuration;
using System.Linq;
using Test_App.Configuration;

namespace Test_App
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Compilator

            //var configSection = (CppCompilerSection)ConfigurationManager.GetSection("compilerGroup/cppCompiler");

            //var runner = new Cmd();
            ////var arguments = CppCompilerHelper.GetArgumentsString("Argv.exe", new[] { "Argv.cpp" });
            ////var result = runner.Run("D:/", arguments, configSection.CompilerPath + "/g++.exe");

            ////Console.WriteLine(result.Status);
            ////Console.WriteLine(string.Join("/n", result.Errors??new string[0]));

            //var result = runner.Run("D:/", "dfasdfasdf", "D:/Argv.exe");
            //Console.WriteLine(result.Status);
            //Console.WriteLine(string.Join("/n", result.Output));

            #endregion

            #region Repository

            var _subjectRepository = new TestRepository();

            //var newSubject = new Subject
            //{
            //    Name = "Test",
            //    CreationDate = DateTime.Now,
            //    Description = "description"
            //};
            //_subjectRepository.Add(newSubject);

            //newSubject.Description = "Updated";
            //_subjectRepository.Update(newSubject);

            //var updatedSubject = _subjectRepository.GetById(newSubject.Id);

            var newTest = new Test
            {
                TaskId = 1,
                Name = "Test",
                InputArguments = "fsdf dsfs sdfas",
                OutputArguments = "fdsafdfasdf"
            };

            _subjectRepository.Add(newTest);

            _subjectRepository.Delete(newTest);
            

            #endregion
        }
    }
}
