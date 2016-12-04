﻿using System;
using System.Collections.Generic;
using BusinesServices.Contracts;
using FirstStep_Storage.Contracts;
using System.Linq;
using ExpressMapper;
using FirstStep_Storage.Models;
using Group = BusinesServices.Models.Group;

namespace BusinesServices.Services
{
    internal class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;

        private readonly ISubjectGroupRepository _subjectGroupRepository;

        public GroupService(IGroupRepository groupRepository, ISubjectGroupRepository subjectGroupRepository)
        {
            _groupRepository = groupRepository;
            _subjectGroupRepository = subjectGroupRepository;
        }

        public void Delete(string id)
        {
            var group = _groupRepository.GetById(id);

            if (group != null)
            {
                _groupRepository.Delete(group);
            }
        }

        public IList<Group> GetAll()
        {
            return _groupRepository
                .Items()
                .Select(g => Mapper.Map< FirstStep_Storage.Models.Group, Group>(g))
                .ToList();
        }

        public Group GetById(string id)
        {
            return Mapper.Map<FirstStep_Storage.Models.Group, Group>
                (_groupRepository.GetById(id));
        }

        public void Save(Group group)
        {
            group.Id = _groupRepository.Save(
                Mapper.Map<Group, FirstStep_Storage.Models.Group>(group));
        }

        public void AssignToGroup(string groupId, string subjectId)
        {
            _subjectGroupRepository.Save(new SubjectGroup()
            {
                SubjectId = subjectId,
                GroupId = groupId
            });
        }

        public void UnassignFromGroup(string groupId, string subjectId)
        {
            var subjectGroup = _subjectGroupRepository.Items()
                .FirstOrDefault(sg => sg.GroupId == groupId && sg.SubjectId == subjectId);

            if (subjectGroup != null)
            {
                _subjectGroupRepository.Delete(subjectGroup);
            }
        }
    }
}
