using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.Services.Business;
using JI.Services.Contracts;
using JI.Services.Models;

namespace JI.Services.Services
{
    internal class GroupService : IGroupService
    {
        private readonly IGroupsRepository _groupRepository;

        public GroupService(IGroupsRepository groupsRepository)
        {
            _groupRepository = groupsRepository;
        }

        public ServiceResult<Group> Save(Group group)
        {
            var validationResult = ValidateGroup(group);
            if (validationResult.Succeeded)
            {
                var storageGroup = Mapper.Map<Group, DataStorageAccess.Repositories.Models.Group>(group);
                try
                {
                    group.Id = _groupRepository.Save(storageGroup);

                    return ServiceResult<Group>.Success(group);
                }
                catch (Exception ex)
                {
                    //todo add logging
                    return ServiceResult<Group>.Failed("Error occured while processing request.");
                }

            }

            return validationResult.Convert<Group>();
        }

        public ServiceResult Delete(string id)
        {
            try
            {
                _groupRepository.Delete(new Guid(id));
            }
            catch (Exception ex)
            {
                //todo add logging
                return ServiceResult.Failed("Error occured while processing request.");
            }
            return ServiceResult.Success();
        }

        public IList<Group> GetAll()
        {
            return
                _groupRepository.Items()
                .Select(Mapper.Map<DataStorageAccess.Repositories.Models.Group, Group>)
                .ToList();
        }

        public Group FindById(string groupId)
        {
            return _groupRepository.Items()
                .FirstOrDefault(g => g.Id.Equals(new Guid(groupId)))
                ?.Map<DataStorageAccess.Repositories.Models.Group, Group>();
        }

        public void Dispose()
        {
            _groupRepository.Dispose();
        }

        private ServiceResult ValidateGroup(Group group)
        {
            if (_groupRepository.Items()
                .Any(g => g.Name.Equals(group.Name, StringComparison.OrdinalIgnoreCase)
                          && !g.Id.Equals(group.Id)))
            {
                return ServiceResult.Failed($"Group with name {group.Name} already exists");
            }

            return ServiceResult.Success();
        }
    }
}
