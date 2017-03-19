using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Business.Extensions
{
    internal static class QueryExtensions
    {

        #region user roles

        [ExpressionMethod("UserRolesImpl")]
        public static IEnumerable<Role> GetRoles(this User user)
        {
            return (_userRolesImpl ?? (_userRolesImpl = UserRolesImpl().Compile()))(user);
        }

        static Func<User, IEnumerable<Role>> _userRolesImpl;
        static Expression<Func<User, IEnumerable<Role>>> UserRolesImpl()
        {
            return s => s.UserRoles.Select(ur => ur.Role);
        }

        #endregion

        #region user groups

        [ExpressionMethod("UserGroupsImpl")]
        public static IEnumerable<Group> GetGroups(this User user)
        {
            return (_userGroupsImpl ?? (_userGroupsImpl = UserGroupsImpl().Compile()))(user);
        }

        static Func<User, IEnumerable<Group>> _userGroupsImpl;
        static Expression<Func<User, IEnumerable<Group>>> UserGroupsImpl()
        {
            return s => s.UserGroups.Select(ug => ug.Group);
        }

        #endregion

        #region subject groups

        [ExpressionMethod("SubjectGroupsImpl")]
        public static IEnumerable<Group> GetGroups(this Subject subject)
        {
            return (_subjectGroupsImpl ?? (_subjectGroupsImpl = SubjectGroupsImpl().Compile()))(subject);
        }

        static Func<Subject, IEnumerable<Group>> _subjectGroupsImpl;
        static Expression<Func<Subject, IEnumerable<Group>>> SubjectGroupsImpl()
        {
            return s => s.SubjectGroups.Select(sg => sg.Group);
        }

        #endregion

    }
}
