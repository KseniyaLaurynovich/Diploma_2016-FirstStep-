using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Users")]
    public class User
    {
        public User() { }

        internal User(User user)
        {
            Id = user.Id;
            Email = user.Email;
            UserName = user.UserName;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Patronymic = user.Patronymic;
            IsEmailConfirmed = user.IsEmailConfirmed;
            RegistrationDate = user.RegistrationDate;
            PasswordHash = user.PasswordHash;
            SecurityStamp = user.SecurityStamp;
            RegistrationDate = user.RegistrationDate;
            IsActivated = user.IsActivated;
        }

        [Column(Name = "Id"), PrimaryKey, Identity]
        public Guid Id { get; set; }

        [Column(Name = "Email"), NotNull]
        public string Email { get; set; }

        [Column(Name = "UserName"), NotNull]
        public string UserName { get; set; }

        [Column(Name = "LastName"), NotNull]
        public string LastName { get; set; }

        [Column(Name = "FirstName"), NotNull]
        public string FirstName { get; set; }

        [Column(Name = "Patronymic"), NotNull]
        public string Patronymic { get; set; }

        [Column(Name= "IsEmailConfirmed")]
        public bool IsEmailConfirmed { get; set; }

        [Column(Name = "PasswordHash")]
        public string PasswordHash { get; set; }

        [Column(Name="SecurityStamp")]
        public string SecurityStamp { get; set; }

        [Column(Name = "RegistrationDate")]
        public DateTime RegistrationDate { get; set; }

        [Column(Name = "IsActivated")]
        public bool IsActivated { get; set; }

        [Association(ThisKey = "Id", OtherKey = "UserId")]
        public IList<UserRole> UserRoles { get; set; }

        [Association(ThisKey = "Id", OtherKey = "UserId")]
        public IList<UserGroup> UserGroups { get; set; }

        public IList<Role> Roles { get; set; }

        public IList<Group> Groups { get; set; }
    }
}
