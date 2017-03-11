using System;
using System.Collections;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace JI.DataStorageAccess.Models
{
    [Table(Name = "Users")]
    public class User
    {
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
    }
}
