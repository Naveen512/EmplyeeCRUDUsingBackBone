using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmplyeeCRUDUsingBackBone.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Email { get; set; }

        public decimal Salary { get; set; }
    }
}