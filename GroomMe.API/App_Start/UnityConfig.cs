using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;
using Web.API.Kata.Controllers;
using Web.API.Kata.Data;

namespace Web.API.Kata
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<CourseRepository, CourseRepository>();
            container.RegisterType<TagsRepository, TagsRepository>();

            container.RegisterType<IUserStore<IdentityUser>, UserStore<IdentityUser>>();
            container.RegisterType<UserManager<IdentityUser>>();
           
         
            container.RegisterType<AccountController>(new InjectionConstructor());

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}