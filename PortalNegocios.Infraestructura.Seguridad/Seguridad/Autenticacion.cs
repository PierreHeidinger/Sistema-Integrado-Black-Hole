using System;
using System.Web;
using System.Web.Security;

namespace PortalNegocios.Infraestructura.Seguridad.Seguridad
{
    public class Autenticacion
    {


        public static void AgregarUsuarioSession(string id)
        {
            
            bool persist = true;
            var cookie = FormsAuthentication.GetAuthCookie("Usuario", persist);

            cookie.Name = FormsAuthentication.FormsCookieName;
            cookie.Expires = DateTime.Now.AddHours(1);

            var ticket = FormsAuthentication.Decrypt(cookie.Value);
            var newTicket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration, ticket.IsPersistent, id);

            cookie.Value = FormsAuthentication.Encrypt(newTicket);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }


        public static bool ExisteUsuarioSession()
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }


        public static int ObtenerUsuario()
        {
            int user_id = 0;
            if (HttpContext.Current.User != null && HttpContext.Current.User.Identity is FormsIdentity)
            {
                FormsAuthenticationTicket ticket = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket;
                if (ticket != null)
                {
                    user_id = Convert.ToInt32(ticket.UserData);
                }
            }
            return user_id;
        }


        public static void DestruirSession()
        {
            FormsAuthentication.SignOut();
        }

    }
}
