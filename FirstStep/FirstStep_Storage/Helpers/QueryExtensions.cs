using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FirstStep_Storage.Models;
using LinqToDB;

namespace FirstStep_Storage.Helpers
{
    internal static class QueryExtensions
    {
        [ExpressionMethod("GroupsImpl")]
        public static IEnumerable<Group> GetGroups(this Subject subject)
        {
            return (_groupsImpl ?? (_groupsImpl = GroupsImpl().Compile()))(subject);
        }

        static Func<Subject, IEnumerable<Group>> _groupsImpl;
        static Expression<Func<Subject, IEnumerable<Group>>> GroupsImpl()
        {
            return s => s.SubjectGroups.Select(sc => sc.Group);
        }
    }
}
