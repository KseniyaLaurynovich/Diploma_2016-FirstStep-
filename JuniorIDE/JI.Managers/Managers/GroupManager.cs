using System;
using System.Collections.Generic;
using System.Linq;
using ExpressMapper;
using ExpressMapper.Extensions;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using Group = JI.Managers.Models.Group;

namespace JI.Managers.Managers
{
    internal class GroupManager : IGroupManager
    {
        private readonly IGroupStore _groupStore;

        public GroupManager(IGroupStore groupStore)
        {
            _groupStore = groupStore;
        }

        public ServiceResult Delete(string id)
        {
            try
            {
                _groupStore.Delete(new Guid(id));
            }
            catch (Exception ex)
            {
                //todo add logging
                return ServiceResult.Failed(Resources.Resources.InternalError);
            }
            return ServiceResult.Success;
        }

        public IList<Group> GetAll()
        {
            return _groupStore
                .Items
                .Select(g => Mapper.Map<DataStorageAccess.Models.Group, Group>(g))
                .ToList();
        }

        public Group GetById(string id)
        {
            return _groupStore.FindById(new Guid(id))
                .Map<DataStorageAccess.Models.Group, Group>();
        }

        public ServiceResult<Group> Save(Group group)
        {
            var validationResult = ValidateGroup(group);
            if (validationResult.Succeeded)
            {
                var storageGroup = Mapper.Map<Group, DataStorageAccess.Models.Group>(group);
                try
                {
                    group.Id = _groupStore.Save(storageGroup).ToString();

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

        public Group FindById(string groupId)
        {
            var group = _groupStore.Items.FirstOrDefault(g => g.Id.Equals(new Guid(groupId)));
            return @group?.Map<DataStorageAccess.Models.Group, Group>();
        }

        public void Dispose()
        {
            _groupStore?.Dispose();
        }

        private ServiceResult ValidateGroup(Group group)
        {
            if (_groupStore.Items.Any(g =>
                            g.Name.Equals(group.Name)
                            && !g.Id.Equals(g.Id)))
            {
                return ServiceResult.Failed(Resources.Resources.GroupNameDuplicated(group.Name));
            }

            return ServiceResult.Success;
        }
    }
}
    