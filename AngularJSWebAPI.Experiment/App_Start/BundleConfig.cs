using System.Web;
using System.Web.Optimization;

namespace AngularJSWebAPI.Experiment
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css/JustEat/justeat")
                .IncludeDirectory("~/Content/css/JustEat", "*.css", true));

            bundles.Add(new ScriptBundle("~/Scripts/app")
              .IncludeDirectory("~/Scripts/app", "*.js", true));
        }
    }
}
