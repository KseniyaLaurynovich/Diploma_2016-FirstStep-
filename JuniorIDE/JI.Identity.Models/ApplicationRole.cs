﻿using Microsoft.AspNet.Identity;

namespace JI.Identity.Models
{
    public class ApplicationRole : IRole<string>
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }
}
