using JI.Api.Models;
using JI.Services.Models;

namespace JI.Api.ViewModels
{
    public class UserDetailsViewModel : UserModel
    {
        public Subject[] Subjects { get; set; }
    }
}