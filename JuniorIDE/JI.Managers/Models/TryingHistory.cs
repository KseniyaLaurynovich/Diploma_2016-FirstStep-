using System;
using System.Collections.Generic;

namespace JI.Managers.Models
{
    public class TryingHistory
    {
        public string Id { get; set; }

        public string ProjectId { get; set; }

        public DateTime DateTime { get; set; }

        public bool Compiled { get; set; }

        public IList<Trying> Items { get; set; }
    }
}
