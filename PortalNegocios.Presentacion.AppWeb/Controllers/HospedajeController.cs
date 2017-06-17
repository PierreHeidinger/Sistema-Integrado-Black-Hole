using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using PortalNegocios.Nucleo.DTO;
using PortalNegocios.Presentacion.AppWeb.Models.Hospedaje;
using PortalNegocios.Aplicacion.Wcf.Servicio;

namespace PortalNegocios.Presentacion.AppWeb.Controllers
{
    public class HospedajeController : Controller
    {
        ServicioPortalNegocios _wcfPortalNegocios;
        public HospedajeController()
        {
            _wcfPortalNegocios = new ServicioPortalNegocios();
        }
        [HttpGet]
        public ActionResult Busqueda()
        {        
            var busquedaHospedajeDTO = _wcfPortalNegocios.ListarFiltrado(null);
            var busquedaView = new BusquedaHospedajeModelView();
                busquedaView.busquedaHospedajeDTO = busquedaHospedajeDTO.ToList();
            
            return View("BusquedaHospedaje", busquedaView);
        }

        [HttpPost]
        public ActionResult Busqueda(BusquedaHospedajeModelView busqueda)
        {
            return View();
        }

        public ActionResult NuevoHospedaje()
        {
            var hospedajeModelView = new HospedajeModelView();
            hospedajeModelView.DatosHospedajeModelView = _wcfPortalNegocios.ListarDatosHospedajeDTO();
            hospedajeModelView.hospedajeDTO = new HospedajeDTO();
            return PartialView("_Hospedaje",hospedajeModelView);
        }

        
        public ActionResult ObtenerHospedaje(int idHospedaje)
        {
            var hospedajeModelView = new HospedajeModelView();
            hospedajeModelView.DatosHospedajeModelView = _wcfPortalNegocios.ListarDatosHospedajeDTO();
            hospedajeModelView.hospedajeDTO = _wcfPortalNegocios.ObtenerHospedaje(idHospedaje); 


            return View("_Hospedaje", hospedajeModelView);
        }

        [HttpPost]
        public JsonResult GrabarHospedaje(HospedajeDTO hospedajeDTO)
        {
            var resultado = _wcfPortalNegocios.GrabarHospedaje(hospedajeDTO);

            return Json(resultado);
        }
    }
}
