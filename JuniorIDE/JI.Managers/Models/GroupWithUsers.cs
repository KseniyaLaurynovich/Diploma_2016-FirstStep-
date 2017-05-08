using System;
using System.Collections.Generic;
using JI.Identity.Models;

namespace JI.Managers.Models
{
    public class GroupWithUsers
    {
        public Group Group { get; set; }
        public IList<ApplicationUser> Users { get; set; }
    }
}
