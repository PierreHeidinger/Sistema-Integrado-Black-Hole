using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

using PortalNegocios.Dominio.Entidad;
using PortalNegocios.Persistencia.InsightDatabase.Repositorio;
using System.ServiceModel.Web;

namespace PortalNegocios.Aplicacion.ServicioMovil.Contratos
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService1" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IServicioHospedaje
    {
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json,RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        IList<Hospedaje> ListarFiltrado(object hospedaje);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        Hospedaje Obtener();
    }
}
