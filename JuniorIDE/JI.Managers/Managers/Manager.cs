using System;
using System.Collections.Generic;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Models;
using JI.Managers.Business.Models;
using JI.Managers.Contracts;
using System.Linq;
using ExpressMapper.Extensions;

namespace JI.Managers.Managers
{
    internal abstract class Manager<T, K> : IManager<T>
        where T : class
        where K : class, IWithIdentifier
    {
        protected readonly IStore<K> Store;

        protected Manager(IStore<K> store)
        {
            Store = store;
        }

        public virtual ServiceResult<T> Save(T project)
        {
            var validationResult = Validate(project);
            if (validationResult.Succeeded)
            {
                var storageObj = Map(project);
                try
                {
                    storageObj.Id = Store.Save(storageObj);
                    return ServiceResult<T>.Success(storageObj.Map(project));
                }
                catch (Exception ex)
                {
                    //todo add logging
                    return ServiceResult<T>.Failed(Resources.Resources.InternalError);
                }

            }

            return validationResult.Convert<T>();
        }

        public virtual ServiceResult Delete(string id)
        {
            try
            {
                Store.Delete(new Guid(id));
            }
            catch (Exception ex)
            {
                //todo add logging
                return ServiceResult.Failed(Resources.Resources.InternalError);
            }
            return ServiceResult.Success;
        }

        public virtual IList<T> GetAll()
        {
            return Store.Items
                .Select(Map)
                .ToList();
        }

        public virtual T FindById(string id)
        {
            return Map(Store.FindById(new Guid(id)));
        }

        public virtual void Dispose()
        {
            Store?.Dispose();
        }

        #region protected

        protected abstract ServiceResult Validate(T obj);

        protected virtual T Map(K dbModel)
        {
            return dbModel.Map<K, T>();
        }

        protected virtual K Map(T model)
        {
            return model.Map<T, K>();
        }

        #endregion
    }
}
