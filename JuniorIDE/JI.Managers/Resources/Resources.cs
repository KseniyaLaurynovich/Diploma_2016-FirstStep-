using System.Globalization;
using System.Resources;

namespace JI.Managers.Resources
{
    internal class Resources
    {
        private static ResourceManager _resourceMan;

        public static ResourceManager ResourceManager
        {
            get
            {
                if (ReferenceEquals(_resourceMan, null))
                    _resourceMan = new ResourceManager("JI.Managers.Properties.Resources", typeof(Resources).Assembly);
                return _resourceMan;
            }
        }

        internal static CultureInfo Culture { get; set; }

        public static string InvalidRolesSet => ResourceManager.GetString("InvalidRolesSet", Culture);

        public static string InternalError => ResourceManager.GetString("InternalError", Culture);

        public static string GroupNameDuplicated(string name)
            => string.Format(ResourceManager?.GetString("GroupNameDuplicated", Culture) ?? string.Empty, name);

        public static string SubjectNameDuplicated(string name)
            => string.Format(ResourceManager?.GetString("SubjectNameDuplicated", Culture) ?? string.Empty, name);

        public static string TaskNameDuplicated(string name)
            => string.Format(ResourceManager?.GetString("TaskNameDuplicated", Culture) ?? string.Empty, name);

    }
}
