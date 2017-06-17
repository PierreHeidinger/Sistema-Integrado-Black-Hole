using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

using PortalNegocios.Dominio.Entidad;
using PortalNegocios.Nucleo.DTO;

namespace PortalNegocios.Aplicacion.Wcf.Contrato
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IServicioHospedaje" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IServicioHospedaje
    {

        [OperationContract]
        List<BusquedaHospedajeDTO> ListarFiltrado(BusquedaHospedajeDTO hospedaje);
        [OperationContract]
        Hospedaje Obtener();
        [OperationContract]
        DatosHospedajeDTO ListarDatosHospedajeDTO();
        [OperationContract]
        HospedajeDTO GrabarHospedaje(HospedajeDTO hospedajeDTO);
        [OperationContract]
        HospedajeDTO ObtenerHospedaje(int IdHospedaje);


    }
}
