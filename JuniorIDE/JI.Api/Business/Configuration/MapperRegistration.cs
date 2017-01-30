﻿using ExpressMapper;
using JI.Api.Models;
using JI.Common.Mapper.Contracts;
using JI.Identity.Models;

namespace JI.Api.Business.Configuration
{
    public class MapperRegistration : IMapperRegistrationModule
    {
        public void Register()
        {
            Mapper.Register<RegisterModel, ApplicationUser>();
        }
    }
}