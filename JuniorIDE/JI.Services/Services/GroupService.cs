using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Repositories.Contracts;
using JI.Services.Business.Models;
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
                    return ServiceResult<Group>.Failed(Resources.Resources.InternalError);
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
                return ServiceResult<Group>.Failed(Resources.Resources.InternalError);
            }
            return ServiceResult.Success;
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
                .Any(g => g.Name.Equals(group.Name)
                          && !g.Id.Equals(group.Id)))
            {
                return ServiceResult.Failed(Resources.Resources.GroupNameDuplicated(group.Name));
            }

            return ServiceResult.Success;
        }
    }
}
