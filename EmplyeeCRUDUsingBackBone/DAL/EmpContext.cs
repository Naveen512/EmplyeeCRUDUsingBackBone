using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using EmplyeeCRUDUsingBackBone.Models;

namespace EmplyeeCRUDUsingBackBone.DAL
{
    public class EmpContext:DbContext
    {
        public EmpContext():base("EmpContextDb")
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}