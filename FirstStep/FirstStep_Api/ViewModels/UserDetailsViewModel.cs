using BusinesServices.Models;

namespace FirstStep_Api.ViewModels
{
    public class UserDetailsViewModel : UserViewModel
    {
        public Subject[] Subjects { get; set; }
    }
}