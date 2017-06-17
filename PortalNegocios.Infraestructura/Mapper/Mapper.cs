using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using AutoMapper;

namespace PortalNegocios.Infraestructura.Mapper
{
    public class Mapper 
    {
        IMapper _mapper;
      
        public Mapper(Profile Profile)
        {
            Configurar(Profile);
           
        }
        
        public void Configurar(Profile Profile)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(Profile);

            });

            _mapper = config.CreateMapper();
          
        }

        public IMapper Mapear()
        {
            return _mapper;
        }
    }
}
