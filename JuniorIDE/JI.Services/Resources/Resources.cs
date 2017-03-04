﻿using System.Globalization;
using System.Resources;

namespace JI.Services.Resources
{
    internal class Resources
    {
        private static ResourceManager _resourceMan;

        public static ResourceManager ResourceManager
        {
            get
            {
                if (ReferenceEquals(_resourceMan, null))
                    _resourceMan = new ResourceManager("JI.Services.Properties.Resources", typeof(Properties.Resources).Assembly);
                return _resourceMan;
            }
        }

        internal static CultureInfo Culture { get; set; }

        public static string InternalError => ResourceManager.GetString("InternalError", Culture);

        public static string GroupNameDuplicated(string name) 
            => string.Format(ResourceManager?.GetString("GroupNameDuplicated", Culture)??string.Empty, name);

        public static string SubjectNameDuplicated(string name)
            => string.Format(ResourceManager?.GetString("SubjectNameDuplicated", Culture) ?? string.Empty, name);
        
    }
}
