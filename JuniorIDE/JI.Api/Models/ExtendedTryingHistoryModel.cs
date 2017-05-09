using System.Collections.Generic;
using Newtonsoft.Json;

namespace JI.Api.Models
{
    public class ExtendedTryingHistoryModel : TryingHistoryModel
    {
        [JsonProperty(PropertyName = "ext_items")]
        public IList<ExtendedTryingModel> ExtendedItems { get; set; }
    }
}