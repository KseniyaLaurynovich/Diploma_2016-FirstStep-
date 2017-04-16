using System;

namespace JI.Managers.Models
{
    public class TestResult
    {
        public string Id { get; set; }

        public string ProjectId { get; set; }

        public DateTime DateTime { get; set; }

        public bool Compiled { get; set; }

        //TODO add tryings
    }
}
