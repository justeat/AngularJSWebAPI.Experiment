﻿using System.Web.Mvc;
using System.Web.Routing;

namespace AngularJSWebAPI.Experiment
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "AngularHtml5",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" });
        }
    }
}

