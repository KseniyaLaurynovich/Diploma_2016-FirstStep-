﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using JI.Api.Models;
using JI.Services.Models;

namespace JI.Api.ViewModels
{
    public class SubjectViewModel
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string UserId { get; set; }

        public UserModel User { get; set; }

        public int TasksCount { get; set; }

        public IList<Group> AssignGroups { get; set; }
    }
}