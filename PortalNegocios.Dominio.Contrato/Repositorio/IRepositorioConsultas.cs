using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using PortalNegocios.Dominio.Entidad; 

namespace PortalNegocios.Dominio.Contrato.Repositorio
{
    public interface IRepositorioConsultas 
    {
        IList<ValorTabla> ValorTablaListarFiltrado(string codigoTabla);
    }
}
