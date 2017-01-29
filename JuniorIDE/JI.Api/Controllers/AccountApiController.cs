﻿using System.Web.Http;
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
        [Route("changepassword")]
        public IHttpActionResult ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = UserManager.Value.ChangePassword(
                User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

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
        [AllowAnonymous]
        [Route("confirmemail")]
        public IHttpActionResult ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return GetErrorResult(null);
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
                return GetErrorResult(null);
            }

            var code = UserManager.Value.GeneratePasswordResetToken(user.Id);
            UserManager.Value.SendEmail(user.Id, "Reset Password", $"Please reset your password using this code \"{code}\".");

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