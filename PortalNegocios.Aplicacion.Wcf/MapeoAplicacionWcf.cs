using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

using PortalNegocios.Nucleo.DTO;
using PortalNegocios.Dominio.Entidad;

namespace PortalNegocios.Aplicacion.Wcf
{
    class MapeoAplicacionWcf : Profile
    {
        public MapeoAplicacionWcf()
        {

            //ValorTabla <--> ElementoSelectorDTO
            CreateMap<ValorTabla, ElementoSelectorDTO>();
            CreateMap<ElementoSelectorDTO, ValorTabla>();

            //HospedajeDTO <--> Hospedaje
            CreateMap<HospedajeDTO, Hospedaje>();
            CreateMap<Hospedaje, HospedajeDTO>();

        }
    }
}
