using System;

namespace JI.DataStorageAccess.Models
{
    public interface IWithIdentifier
    {
        Guid Id { get; set; }
    }
}
