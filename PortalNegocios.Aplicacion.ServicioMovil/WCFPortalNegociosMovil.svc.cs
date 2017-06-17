using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using PortalNegocios.Nucleo.DTO;
using PortalNegocios.Aplicacion.ServicioMovil.Contratos;
using PortalNegocios.Persistencia.InsightDatabase.Repositorio;
using PortalNegocios.Dominio.Entidad;


namespace PortalNegocios.Aplicacion.ServicioMovil
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "WCFPortalNegociosMovil" en el código, en svc y en el archivo de configuración a la vez.
    // NOTA: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione WCFPortalNegociosMovil.svc o WCFPortalNegociosMovil.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class WCFPortalNegociosMovil : IServicioHospedaje
    {
        private RepositorioHospedaje _repositorioHospedaje;

        public WCFPortalNegociosMovil()
        {
            _repositorioHospedaje = new RepositorioHospedaje();
        }
        public IList<Hospedaje> ListarFiltrado(object hospedaje)
        {
            var parametro = (Hospedaje)hospedaje;
            return _repositorioHospedaje.ListarFiltrado(parametro);
        }

        public Hospedaje Obtener()
        {
            return _repositorioHospedaje.Obtener(1001);
        }
    }
}
