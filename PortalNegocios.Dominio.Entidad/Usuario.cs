using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortalNegocios.Dominio.Entidad
{
    public class Usuario
    {
        /// <summary>
        /// Entidad Usuarios
        /// </summary>
        public int Codigo_usuario { get; set; }        
        public string Nombres { get; set; }
        public string Apellido_paterno { get; set; }
        public string Apellido_materno { get; set; }
        public DateTime Fecha_registro { get; set; }
        public string usuario { get; set; }
        public string Clave { get; set; }
        public int Telefono { get; set; }
        public int Celular { get; set; }
        public string Direccion { get; set; }
        public int Codigo_rol { get; set; }


        public Usuario()
        {

        }

        public Usuario(int Codigo_usuario,string Nombres,string Apellido_paterno,string Apellido_materno,DateTime Fecha_registro,
                       string usuario,string Clave,int Telefono,int Celular,string Direccion,int Codigo_rol)
        {
            this.Codigo_usuario = Codigo_usuario;
            this.Nombres = Nombres;
            this.Apellido_paterno = Apellido_paterno;
            this.Apellido_materno = Apellido_materno;
            this.Fecha_registro = Fecha_registro;
            this.usuario = usuario;
            this.Clave = Clave;
            this.Telefono = Telefono;
            this.Celular = Celular;
            this.Direccion = Direccion;
            this.Codigo_rol = Codigo_rol;
        }
    }
}
