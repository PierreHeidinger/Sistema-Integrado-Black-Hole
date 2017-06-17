using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using PortalNegocios.Persistencia.InsightDatabase.Repositorio;
using PortalNegocios.Dominio.Entidad;
using System.Web.Routing;

namespace PortalNegocios.Presentacion.AppWeb.Controllers
{
    public class HomeController : Controller
    {
        
        
        public ActionResult Inicio()
        {
            return View();
        }     

        
    }


}
