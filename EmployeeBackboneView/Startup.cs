using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmployeeBackboneView.Startup))]
namespace EmployeeBackboneView
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
