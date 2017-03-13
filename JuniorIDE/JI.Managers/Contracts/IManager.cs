using System;
using System.Collections.Generic;
using JI.Managers.Business.Models;

namespace JI.Managers.Contracts
{
    public interface IManager<T> : IDisposable
        where T : class
    {
        ServiceResult<T> Save(T obj);
        ServiceResult Delete(string id);
        IList<T> GetAll();
        T FindById(string id);
    }
}
