using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortalNegocios.Dominio.Entidad
{
    public class Hospedaje
    {
        public int IdHospedaje  {get;set;}
        public string Nombre { get; set; }
        public string DescripcionCorta { get; set; }
        public string Descripcion { get; set; }        
        public string Direccion { get; set; }
        public string Localidad { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string TipoHospedaje { get; set; }
        public string UrlPortada { get; set; }
    }
}
