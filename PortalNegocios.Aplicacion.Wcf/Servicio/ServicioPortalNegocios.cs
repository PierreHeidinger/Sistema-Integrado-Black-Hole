using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using PortalNegocios.Persistencia.InsightDatabase.Repositorio;
using PortalNegocios.Aplicacion.Wcf.Contrato;
using PortalNegocios.Dominio.Entidad;
using PortalNegocios.Nucleo.DTO;
using PortalNegocios.Infraestructura.Constantes;
using PortalNegocios.Infraestructura.Mapper;

namespace PortalNegocios.Aplicacion.Wcf.Servicio
{
     
    /// <summary>
    /// 
    /// </summary>
    public class ServicioPortalNegocios : IServicioHospedaje
    {
        RepositorioHospedaje _repositorioHospedaje;
        RepositorioConsultas _repositorioConsultas;
        Mapper _mapper;


        public ServicioPortalNegocios()
        {
            _repositorioHospedaje = new RepositorioHospedaje();
            _repositorioConsultas = new RepositorioConsultas();
            _mapper = new Mapper(new MapeoAplicacionWcf());
        }

        public List<BusquedaHospedajeDTO> ListarFiltrado(BusquedaHospedajeDTO hospedaje)
        {
            return _repositorioHospedaje.ListarFiltrado(hospedaje).ToList();
        }

        public Hospedaje Obtener()
        {
            throw new NotImplementedException();
        }

        public DatosHospedajeDTO ListarDatosHospedajeDTO()
        {
            var valorTablaTipoSolicitud = _repositorioConsultas.ValorTablaListarFiltrado(Constantes.CodigoTablaTipoHospedaje);           
            valorTablaTipoSolicitud.Add(new ValorTabla() { CodigoValor = "", Descripcion = "--Tipo Hotel--" });
            var tipoSolicitud = _mapper.Mapear().Map<List<ValorTabla>, List<ElementoSelectorDTO>>(valorTablaTipoSolicitud.ToList());
            var datosHospedajeDTO = new DatosHospedajeDTO();            
            datosHospedajeDTO.tipoHospedaje = tipoSolicitud.OrderBy(x => x.CodigoValor).ToList();
            return datosHospedajeDTO;
        }

        public HospedajeDTO GrabarHospedaje(HospedajeDTO hospedajeDTO)
        {
            var hospedaje = _mapper.Mapear().Map<HospedajeDTO, Hospedaje>(hospedajeDTO);
            var hospedajeResultado = _repositorioHospedaje.GrabarHospedaje(hospedaje);
            return _mapper.Mapear().Map<Hospedaje,HospedajeDTO>(hospedajeResultado);
        }

        public HospedajeDTO ObtenerHospedaje(int IdHospedaje)
        {         
            var hospedaje = _repositorioHospedaje.ObtenerHospedaje(IdHospedaje);
            return _mapper.Mapear().Map<Hospedaje, HospedajeDTO>(hospedaje);
        }
    }
}
