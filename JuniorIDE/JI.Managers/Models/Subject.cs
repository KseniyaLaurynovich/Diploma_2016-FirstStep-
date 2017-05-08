﻿using System.Collections.Generic;

namespace JI.Managers.Models
{
    public class Subject
    {
        public Subject()
        {
            Groups = new List<Group>();
            Tasks = new List<Task>();
        }

        public string Id { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public IList<Group> Groups { get; set; }

        public IList<Task> Tasks { get; set; }
    }
}
