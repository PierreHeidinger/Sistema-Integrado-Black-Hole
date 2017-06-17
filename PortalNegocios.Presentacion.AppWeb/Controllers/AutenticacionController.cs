using System;
using System.Web.Security;
using System.Web.Mvc;
using System.Web;
using PortalNegocios.Dominio.Entidad;
using PortalNegocios.Persistencia.InsightDatabase.Repositorio;

namespace PortalNegocios.Presentacion.AppWeb.Controllers
{
    public class AutenticacionController : Controller
    {
 

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string  usuario,string clave)
        {
            
            //Usuario usuarios = new Usuario();
            //usuarios.Nombres = usuario;
            //usuarios.Apellido_paterno = clave;
            //Usuario user;

            //user = repositorioUsuario.Autenticacion(usuarios);
            
            //if(user!= null)
            //{
            //    var cookie = FormsAuthentication.GetAuthCookie("usuario", true);

            //    cookie.Name = FormsAuthentication.FormsCookieName;
            //    cookie.Expires = DateTime.Now.AddMonths(3);

            //    var ticket = FormsAuthentication.Decrypt(cookie.Value);
            //    var newTicket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration, ticket.IsPersistent,user.Codigo_usuario.ToString());

            //    cookie.Value = FormsAuthentication.Encrypt(newTicket);
            //    System.Web.HttpContext.Current.Response.Cookies.Add(cookie);
                
            //    return RedirectToAction("Inicio", "Home");

            //}

            return View();
        }
        
        
    }
}
