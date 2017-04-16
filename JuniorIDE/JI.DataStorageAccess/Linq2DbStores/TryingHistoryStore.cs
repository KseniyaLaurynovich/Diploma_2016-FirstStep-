using System;
using System.Transactions;
using JI.DataStorageAccess.Contracts;
using JI.DataStorageAccess.Linq2DbStores.Base;
using JI.DataStorageAccess.Models;
using LinqToDB;

namespace JI.DataStorageAccess.Linq2DbStores
{
    internal class TryingHistoryStore : BaseStore<TryingHistory>, ITryingHistoryStore
    {
        public override Guid Save(TryingHistory task)
        {
            using (var transaction = new TransactionScope())
            {
                var id = base.Save(task);
                foreach (var item in task.Items)
                {
                    item.TryingHistoryId = id;
                    DbConnection.Insert(item);
                }

                transaction.Complete();

                return id;
            }
        }
    }
}
