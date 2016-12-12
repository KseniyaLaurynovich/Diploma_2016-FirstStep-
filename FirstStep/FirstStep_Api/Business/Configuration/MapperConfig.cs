using System.Linq;
using System.Security.Claims;
using System.Web;
using BusinesServices.Models;
using ExpressMapper;
using ExpressMapper.Extensions;
using FirstStep_Api.App_Start;
using FirstStep_Api.Business.Models;
using FirstStep_Api.ViewModels;
using FirstStep_Common;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace FirstStep_Api.Business.Configuration
{
    public class MapperRegistration : IMapperRegistration
    {
        public void Register()
        {
            Mapper.RegisterCustom<ApplicationUser, UserViewModel>(user => new UserViewModel
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Name))?.ClaimValue,
                LastName = user.Claims.FirstOrDefault(c => c.ClaimType.Equals(ClaimTypes.Surname))?.ClaimValue,
                Roles = user.Roles
                    .Select(i => HttpContext.Current.Request.GetOwinContext().GetUserManager<ApplicationRoleManager>().Roles.FirstOrDefault(r => r.Id.Equals(i.RoleId)))
                    .Where(i => i != null)
                    .Select(r => new RoleViewModel
                    {
                        Id = r.Id,
                        Name = r.Name
                    })
                    .ToArray()
            });

            Mapper.RegisterCustom<Subject, SubjectViewModel>(subject => new SubjectViewModel
            {
                Id = subject.Id,
                Name = subject.Name,
                TasksCount = subject.Tasks?.Count??0,
                UserId = subject.UserId,
                AssignGroups = subject.AssignGroups,
                User = HttpContext.Current.Request.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(subject.UserId).Map<ApplicationUser, UserViewModel>()
            });
        }
    }
}