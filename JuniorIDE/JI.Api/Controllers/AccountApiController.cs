﻿using System.Web.Http;
using System.Web.Http.Cors;
using ExpressMapper;
using JI.Api.Controllers.Base;
using JI.Api.Models;
using Microsoft.AspNet.Identity;
using JI.Identity.Models;

namespace JI.Api.Controllers
{
    [RoutePrefix("account")]
    [Authorize]
    public class AccountApiController : BaseApiController
    {
        [HttpPost]
        [Route("changeusername")]
        public IHttpActionResult ChangeUsername(UsernameModel usernameModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = UserManager.Value.ChangeUsername(User.Identity.GetUserId(), usernameModel.Username);

            return !result.Succeeded
                ? GetErrorResult(result)
                : Ok();
        }

        [HttpPost]
        [Route("changepassword")]
        public IHttpActionResult ChangePassword(ChangePasswordModel passwordModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = UserManager.Value.ChangePassword(
                User.Identity.GetUserId(), passwordModel.OldPassword, passwordModel.NewPassword);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public IHttpActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = Mapper.Map<RegisterModel, ApplicationUser>(model);
            var result = UserManager.Value.Create(user, model.Password);

            return !result.Succeeded 
                ? GetErrorResult(result) 
                : Ok();
        }

        [HttpGet]
        [Route("info")]
        public IHttpActionResult FetchAccountInfo()
        {
            var userId = User?.Identity?.GetUserId<string>();

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest();
            }

            var user = UserManager.Value.FindById(userId);

            if (user != null)
            {
                return Ok(Mapper.Map<ApplicationUser, AccountInfoModel>(user));
            }

            return BadRequest();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("confirmemail")]
        public IHttpActionResult ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return GetErrorResult((IdentityResult)null);
            }
            var result = UserManager.Value.ConfirmEmail(userId, code);

            return !result.Succeeded
              ? GetErrorResult(result)
              : Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("forgotpassword")]
        public IHttpActionResult ForgotPassword(ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserManager.Value.FindByEmail(model.Email);
            if (user == null || !UserManager.Value.IsEmailConfirmed(user.Id))
            {
                return GetErrorResult((IdentityResult)null);
            }

            var code = UserManager.Value.GeneratePasswordResetToken(user.Id);
            UserManager.Value.SendEmail(user.Id, "Reset Password", Resources.Resources.ResetPassword(code));

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("resetpassword")]
        public IHttpActionResult ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = UserManager.Value.FindByEmail(model.Email);
            if (user != null)
            {
                var result = UserManager.Value.ResetPassword(user.Id, model.Code, model.Password);
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}