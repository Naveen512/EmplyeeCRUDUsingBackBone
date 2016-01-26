using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmplyeeCRUDUsingBackBone.DAL;
using EmplyeeCRUDUsingBackBone.Models;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace EmplyeeCRUDUsingBackBone.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeeCrudController : ApiController
    {
        private EmpContext empContext = new EmpContext();
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
           return  Request.CreateResponse(HttpStatusCode.OK, empContext.Employees.ToList(),System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);
        }
        [HttpPost]
        public HttpResponseMessage AddEmployee(Employee employee)
        {
            empContext.Employees.Add(employee);
            empContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, employee, System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);
        }

        [HttpDelete]
        public HttpResponseMessage DeleteEmployee(int id)
        {
            var emp = empContext.Employees.Find(id);
            empContext.Employees.Remove(emp);
            empContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, emp, System.Net.Http.Formatting.JsonMediaTypeFormatter.DefaultMediaType);

        }
        [HttpPut]
        public HttpResponseMessage UpdateEmployee( Employee emp)
        {
            if(emp==null)
            {
                throw new ArgumentNullException("No emp item");
            }
            empContext.Entry(emp).State = EntityState.Modified;
            empContext.SaveChanges();
            //var dbemp = empContext.Employees.ToList();
            //int index = dbemp.FindIndex(p => p.EmployeeID == emp.EmployeeID);
            //if (index == -1)
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest, "No emp item");
            //}
            //dbemp.RemoveAt(index);
            //dbemp.Add(emp);
            //empContext.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, emp);
        }
    }
}
