using System.Web;
using System.Web.Mvc;

namespace EmplyeeCRUDUsingBackBone
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
