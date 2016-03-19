using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using CacheCow.Server;
using CacheCow.Server.EntityTagStore.SqlServer;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Web.API.Kata
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //var cors = new EnableCorsAttribute("http://localhost:58141/", "*", "*");
            //config.EnableCors(cors);

            string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            //var etagStore = new SqlServerEntityTagStore(connectionString);
            //GlobalConfiguration.Configuration.MessageHandlers.Add(new CachingHandler(GlobalConfiguration.Configuration, etagStore));

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
           // config.SuppressDefaultHostAuthentication();
           // config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            //JsonSerializerSettings serializerSettings = new JsonSerializerSettings();
            //serializerSettings.Converters.Add(new CustomDateConverter());
            //GlobalConfiguration.Configuration.Formatters[0] = new (serializerSettings);

            	
            var jsonFormatter = config.Formatters.JsonFormatter; 
            var settings = jsonFormatter.SerializerSettings; 
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver(); 
            settings.PreserveReferencesHandling = PreserveReferencesHandling.Objects; 
            settings.Converters.Add(new CustomDateConverter());


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


           
        }
    }
    public class CustomDateConverter : IsoDateTimeConverter
    {
        public CustomDateConverter()
        {
            DateTimeFormat = "yyyyMMdd";
        }
    }
}
