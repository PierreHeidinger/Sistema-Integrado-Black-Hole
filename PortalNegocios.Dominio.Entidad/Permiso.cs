using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortalNegocios.Dominio.Entidad
{
    public class Permiso
    { 
        public int codigo_accion { get; set; }
        public int codigo_modulo { get; set; }
        public int codigo_rol { get; set; }
        public string descripcion { get; set; }
    }
}
