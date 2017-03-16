﻿using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores;
using SimpleInjector;
using SimpleInjector.Packaging;

namespace JI.DataStorageAccess.Infrastructure
{
    public class DependencyResolverPackage : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.Register(typeof(IGroupStore), typeof(GroupStore), Lifestyle.Scoped);
            container.Register(typeof(ISubjectStore), typeof(SubjectStore), Lifestyle.Scoped);
            container.Register(typeof(ITaskStore), typeof(TaskStore), Lifestyle.Scoped);
            container.Register(typeof(ITestStore), typeof(TestStore), Lifestyle.Scoped);
        }
    }
}