using System.Globalization;
using System.Resources;

namespace JI.UserIdentity.Resources
{
    internal class Resources
    {
        private static ResourceManager _resourceMan;

        public static ResourceManager ResourceManager
        {
            get
            {
                if (ReferenceEquals(_resourceMan, null))
                    _resourceMan = new ResourceManager("JI.UserIdentity.Properties.Resources", typeof(Resources).Assembly);
                return _resourceMan;
            }
        }

        internal static CultureInfo Culture { get; set; }

        public static string InvalidRolesSet => ResourceManager.GetString("InvalidRolesSet", Culture);

        public static string InternalError => ResourceManager.GetString("InternalError", Culture);
    }
}
