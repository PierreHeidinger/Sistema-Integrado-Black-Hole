using System.Web;
using System.Web.Optimization;

namespace PortalNegocios.Presentacion.AppWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
              
            //Estilos
            bundles.Add(new StyleBundle("~/Content/Arquitectura/lib/css").Include(
                        "~/Content/Arquitectura/lib/css/bootstrap.min.css",
                        "~/Content/Arquitectura/lib/css/font-awesome.min.css",
                        "~/Content/Arquitectura/lib/css/animate.min.css",
                        "~/Content/Arquitectura/lib/css/bootstrap-switch.min.css",
                        "~/Content/Arquitectura/lib/css/checkbox3.min.css",
                        "~/Content/Arquitectura/lib/css/jquery.dataTables.min.css",
                        "~/Content/Arquitectura/lib/css/dataTables.bootstrap.css",
                        "~/Content/Arquitectura/lib/css/select2.min.css"
                        ));
            bundles.Add(new StyleBundle("~/Content/Arquitectura/css").Include(
                        "~/Content/Arquitectura/css/style.css",
                        "~/Content/Arquitectura/css/themes/flat-blue.css",
                        "~/Content/Arquitectura/css/themes/flat-green.css"
                        ));
            //Date picker
            bundles.Add(new StyleBundle("~/Content/Arquitectura/datepicker/css").Include(
                        "~/Content/Arquitectura/datepicker/css/bootstrap-datepicker.css"
                        ));
            bundles.Add(new StyleBundle("~/Content/Arquitectura/notificaciones/css").Include(
                        "~/Content/Arquitectura/notificaciones/css/jquery-confirm.min.css"
                        ));


            //Scrips       
            bundles.Add(new ScriptBundle("~/Content/Arquitectura/lib/js").Include(
                "~/Content/Arquitectura/lib/js/jquery.min.js",
                "~/Content/Arquitectura/lib/js/bootstrap.min.js",
                "~/Content/Arquitectura/lib/js/bootstrap-switch.min.js",
                "~/Content/Arquitectura/lib/js/jquery.matchHeight-min.js",
                "~/Content/Arquitectura/lib/js/dataTables.bootstrap.min.js",
                "~/Content/Arquitectura/lib/js/select2.full.min.js",
                "~/Content/Arquitectura/lib/js/ace/ace.js",
                "~/Content/Arquitectura/lib/js/ace/mode-html.js",
                "~/Content/Arquitectura/lib/js/ace/theme-github.js"
                 ));

            bundles.Add(new ScriptBundle("~/Content/Arquitectura/js").Include(
                      "~/Content/Arquitectura/js/app.js",
                      "~/Content/Arquitectura/js/index.js"));
            bundles.Add(new ScriptBundle("~/Content/Arquitectura/datepicker/js").Include(
                       "~/Content/Arquitectura/datepicker/js/bootstrap-datepicker.min.js"
                       ));
            bundles.Add(new ScriptBundle("~/Content/Arquitectura/notificaciones/js").Include(
                       "~/Content/Arquitectura/notificaciones/js/jquery-confirm.min.js"
                       ));
            bundles.Add(new ScriptBundle("~/Scripts/Views/Hospedaje").Include(
                      "~/Scripts/Views/Hospedaje/Hospedaje.js"
                      ));
            

        }
    }
}
