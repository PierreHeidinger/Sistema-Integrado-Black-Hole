using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortalNegocios.Nucleo.DTO
{
    public class BusquedaHospedajeDTO
    {
        public int IdHospedaje { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string DescripcionCorta { get; set; }
        public string TipoHospedaje { get; set; }
    }
}
