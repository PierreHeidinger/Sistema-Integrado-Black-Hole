using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Insight.Database;
using PortalNegocios.Dominio.Contrato.Repositorio;

namespace PortalNegocios.Persistencia.InsightDatabase
{
    public abstract class RepositorioGenerico<Entidad> : IRepositorioGenerico<Entidad> where Entidad : class 
    {
        public IDbConnection _contexto;
  
        public RepositorioGenerico()
        {
            SqlInsightDbProvider.RegisterProvider();
            _contexto = new SqlConnection("server=.\\Pierre;database=Integral;uid=sa;pwd=sql");
        }
        public RepositorioGenerico(IDbConnection conexion)
        {
           SqlInsightDbProvider.RegisterProvider();
            _contexto = conexion;
        }
        public IList<Entidad> Listar()
        {
            return _contexto.Query<Entidad>("",null);
        }
        public IList<Entidad> ListarFiltrado(string procedimientoAlmacenado,Entidad entidad)
        {
            return _contexto.Query<Entidad>(procedimientoAlmacenado, entidad);
        }
        public void Insertar(string procedimientoAlmacenado,Entidad entidad)
        {
             _contexto.Insert<Entidad>(procedimientoAlmacenado, entidad);

        }
        public void Eliminar(Entidad entity)
        {
            throw new NotImplementedException();
        }
        public void Editar(Entidad entity)
        {
            throw new NotImplementedException();
        }
        public Results ResultadoConsulta(string procedimientoAlmacenado,Entidad entity)
        {
            var result = _contexto.QueryResults<Results>(procedimientoAlmacenado,entity);
            return result;
        }

        public IDbConnection obtenerConexion() {
            return _contexto;
        }

        public Entidad Obtener(string procedimientoAlmacenado,Entidad entidad)
        {
            return _contexto.Single<Entidad>(procedimientoAlmacenado, entidad);
        }
    }
}
