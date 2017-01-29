using System;

namespace JI.DataStorageAccess.Repositories.Models
{
    public interface IWithIdentifier
    {
        Guid Id { get; set; }
    }
}
