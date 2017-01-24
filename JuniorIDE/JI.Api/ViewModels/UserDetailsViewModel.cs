using JI.Services.Models;

namespace JI.Api.ViewModels
{
    public class UserDetailsViewModel : UserViewModel
    {
        public Subject[] Subjects { get; set; }
    }
}