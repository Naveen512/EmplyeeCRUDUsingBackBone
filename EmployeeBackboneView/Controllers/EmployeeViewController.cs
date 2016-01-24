using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeBackboneView.Controllers
{
    public class EmployeeViewController : Controller
    {
        // GET: EmployeeView
        public ActionResult Index()
        {
            return View();
        }
    }

}