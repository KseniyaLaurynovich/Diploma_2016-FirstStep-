﻿using ExpressMapper;
using Storage = FirstStep_Storage.Models;
using Busines = BusinesServices.Models;
using FirstStep_Common;

namespace BusinesServices.Configuration
{
    public class MapperRegistration : IMapperRegistration
    {
        public void Register()
        {
            Mapper.Register<Storage.Subject, Busines.Subject>();
            Mapper.Register<Storage.Task, Busines.Task>();
            Mapper.Register<Storage.File, Busines.File>();
            Mapper.Register<Storage.Group, Busines.Group>();
        } 
    }
}
