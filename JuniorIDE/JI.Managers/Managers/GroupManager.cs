using System.Linq;
using JI.DataStorageAccess.Contracts;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using Group = JI.Managers.Models.Group;

namespace JI.Managers.Managers
{
    internal class GroupManager : Manager<Group, DataStorageAccess.Models.Group>, IGroupManager
    {
        public GroupManager(IGroupStore store) 
            : base(store)
        {}

        #region protected

        protected override ServiceResult Validate(Group group)
        {
            if (Store.Items.Any(g =>
                            g.Name.Equals(group.Name)
                            && !g.Id.Equals(g.Id)))
            {
                return ServiceResult.Failed(Resources.Resources.GroupNameDuplicated(group.Name));
            }

            return ServiceResult.Success;
        }

        #endregion
    }
}
    