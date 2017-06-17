using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Insight.Database;

using PortalNegocios.Dominio.Contrato.Repositorio;
using PortalNegocios.Dominio.Entidad;

namespace PortalNegocios.Persistencia.InsightDatabase.Repositorio
{
    public class RepositorioConsultas : RepositorioGenerico<Object> , IRepositorioConsultas
    {
        private const string Sp_BuscarValorTabla = "Lp_BuscarValorTabla";

        public IList<ValorTabla> ValorTablaListarFiltrado(string codigoTabla)
        {
            var parametro = new ValorTabla() { CodigoTabla = codigoTabla };
            return _contexto.Query<ValorTabla>(Sp_BuscarValorTabla, parametro);
        }

    }
}
