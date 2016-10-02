using System.Configuration;

namespace Test_App.Configuration
{
    public class CppCompilerSection : ConfigurationSection
    {
        [ConfigurationProperty("path", IsRequired = true)]
        public string CompilerPath
        {
            get
            {
                return (string)this["path"];
            }
            set
            {
                this["path"] = value;
            }
        }
    }
}
