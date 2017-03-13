using System;
using System.Collections.Generic;
using ExpressMapper;
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

        public virtual ServiceResult<T> Save(T obj)
        {
            var validationResult = Validate(obj);
            if (validationResult.Succeeded)
            {
                var storageObj = Mapper.Map<T, K>(obj);
                try
                {
                    var id = Store.Save(storageObj).ToString();
                    return ServiceResult<T>.Success(obj);
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
                .Select(Mapper.Map<K, T>)
                .ToList();
        }

        public virtual T FindById(string id)
        {
            return Store.FindById(new Guid(id)).Map<K, T>();
        }

        public virtual void Dispose()
        {
            Store?.Dispose();
        }

        protected abstract ServiceResult Validate(T obj);
    }
}
