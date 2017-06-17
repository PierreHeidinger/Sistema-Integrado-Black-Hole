using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Insight.Database;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PortalNegocios.Nucleo.DTO;
using PortalNegocios.Dominio.Entidad;
using PortalNegocios.Dominio.Contrato.Repositorio;

namespace PortalNegocios.Persistencia.InsightDatabase.Repositorio
{
    public class RepositorioHospedaje : RepositorioGenerico<Hospedaje>, IRepositorioHospedaje
    {

        private const string Sp_ListarHospedaje = "Lp_ObtenerHospedajes";
        private const string Sp_InsertarHospedaje = "Cp_InsertarHospedaje";
        private const string Sp_ObtenerHospedaje = "Gp_ObtenerHospedaje";

        #region "Metodos Publicos"
        public Hospedaje Obtener(int codigo)
        {
            var storeParams = new { IdLodging = codigo };
            return _contexto.Single<Hospedaje>("SP_MOSTRAR", storeParams);
        }
        public IList<Hospedaje> ListarFiltrado(Hospedaje hospedaje)
        {
            return ListarFiltrado(Sp_ListarHospedaje, hospedaje);
        }
        public IList<BusquedaHospedajeDTO> ListarFiltrado(BusquedaHospedajeDTO hospedaje)
        {
            return _contexto.Query<BusquedaHospedajeDTO>(Sp_ListarHospedaje, hospedaje);
        }
        public Hospedaje GrabarHospedaje(Hospedaje hospedaje)
        {

            if(hospedaje.IdHospedaje == 0)
            {
                InsertarHospedaje(hospedaje);
            }

            var resultado = ObtenerHospedaje(hospedaje.IdHospedaje);

            return resultado;
        }
        public Hospedaje ObtenerHospedaje(int idHospedaje)
        {
            var hospedaje = new Hospedaje() { IdHospedaje = idHospedaje };
            return Obtener(Sp_ObtenerHospedaje, hospedaje);
        }
        #endregion

        #region Metodos Privados
        private void InsertarHospedaje(Hospedaje hospedaje)
        {
           Insertar(Sp_InsertarHospedaje, hospedaje);
        }
        #endregion
    }
}
