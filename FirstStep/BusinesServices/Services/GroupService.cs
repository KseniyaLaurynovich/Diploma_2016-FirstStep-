using System;
using System.Collections.Generic;
using BusinesServices.Contracts;
using BusinesServices.Models;
using FirstStep_Storage.Contracts;
using System.Linq;
using ExpressMapper;

namespace BusinesServices.Services
{
    internal class GroupService : IGroupService
    {
        private IDataRepository _dataRepository;

        public GroupService(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        public void AssignUser(string userId)
        {
            throw new NotImplementedException();
        }

        public void AssignUsers(string[] usersIds)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }

        public IList<Group> GetAll()
        {
            return _dataRepository
                .Items<FirstStep_Storage.Models.Group>()
                .Select(g => Mapper.Map< FirstStep_Storage.Models.Group, Group>(g))
                .ToList();
        }

        public void GetById(string id)
        {
            throw new NotImplementedException();
        }

        public void RemoveFromGroup(string userId)
        {
            throw new NotImplementedException();
        }

        public void Save(Group group)
        {
            throw new NotImplementedException();
        }
    }
}
