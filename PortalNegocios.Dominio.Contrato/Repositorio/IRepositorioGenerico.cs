using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace PortalNegocios.Dominio.Contrato.Repositorio
{
    public interface IRepositorioGenerico<Entity> where Entity : class
    {
        IList<Entity> Listar();
        IList<Entity> ListarFiltrado(string procedimientoAlmacenado,Entity entidad);
        Entity Obtener(string procedimientoAlmacenado, Entity entity);
        void Insertar(string procedimientoAlmacenado, Entity entity);
        void Eliminar(Entity entity);
        void Editar(Entity entity);
    }
}
