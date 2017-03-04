using System.Globalization;
using System.Resources;

namespace JI.Api.Resources
{
    public class Resources
    {
        private static ResourceManager _resourceMan;

        public static ResourceManager ResourceManager
        {
            get
            {
                if (ReferenceEquals(_resourceMan, null))
                    _resourceMan = new ResourceManager("JI.Api.Properties.Resources", typeof(Properties.Resources).Assembly);
                return _resourceMan;
            }
        }

        internal static CultureInfo Culture { get; set; }
        
        public static string ResetPassword(string code)
            => string.Format(ResourceManager?.GetString("ResetPassword", Culture) ?? string.Empty, code);

    }
}